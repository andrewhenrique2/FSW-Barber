"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { Sun, CloudSun, Moon } from "lucide-react"
import { set, isPast, isToday } from "date-fns"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { createBooking } from "../_actions/create-booking"
import { getBookings } from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import BookingSummary from "./booking-summary"
import { useRouter } from "next/navigation"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const MORNING_TIMES = ["09:00", "10:00", "11:00"]
const AFTERNOON_TIMES = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
const EVENING_TIMES = ["19:00", "20:00"]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const filterAvailableTimes = (
  times: string[],
  bookings: Booking[],
  selectedDay: Date,
) => {
  return times.filter((time) => {
    const [hour, minutes] = time.split(":").map(Number)

    const timeIsOnThePast = isPast(set(selectedDay, { hours: hour, minutes }))
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    return !hasBookingOnCurrentTime
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const router = useRouter()
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) return
      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: selectedDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Reserva criada com sucesso!", {
        action: {
          label: "Ver agendamentos",
          onClick: () => router.push("/bookings"),
        },
      })
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva!")
    }
  }

  const morningTimes = useMemo(() => {
    if (!selectedDay) return []
    return filterAvailableTimes(MORNING_TIMES, dayBookings, selectedDay)
  }, [dayBookings, selectedDay])

  const afternoonTimes = useMemo(() => {
    if (!selectedDay) return []
    return filterAvailableTimes(AFTERNOON_TIMES, dayBookings, selectedDay)
  }, [dayBookings, selectedDay])

  const eveningTimes = useMemo(() => {
    if (!selectedDay) return []
    return filterAvailableTimes(EVENING_TIMES, dayBookings, selectedDay)
  }, [dayBookings, selectedDay])

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          {/* IMAGEM */}
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              alt={service.name}
              src={service.imageUrl}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          {/* DIREITA */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            {/* PREÇO E BOTÃO */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="max-h-[100vh] overflow-y-auto px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <>
                      <div className="flex flex-col gap-2 border-b border-solid p-3">
                        {/* MANHÃ */}
                        <div className="flex items-center gap-2">
                          <Sun className="text-yellow-500" />
                          <span className="text-sm font-semibold">Manhã</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                          {morningTimes.length > 0 ? (
                            morningTimes.map((time) => (
                              <Button
                                key={time}
                                variant={
                                  selectedTime === time ? "default" : "outline"
                                }
                                className="rounded-full px-3 py-1 text-xs"
                                onClick={() => handleTimeSelect(time)}
                              >
                                {time}
                              </Button>
                            ))
                          ) : (
                            <p className="px-8 text-xs font-semibold">
                              Não há horários disponíveis pela manhã.
                            </p>
                          )}
                        </div>

                        {/* TARDE */}
                        <div className="flex items-center gap-2">
                          <CloudSun className="text-orange-500" />
                          <span className="text-sm font-semibold">Tarde</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                          {afternoonTimes.length > 0 ? (
                            afternoonTimes.map((time) => (
                              <Button
                                key={time}
                                variant={
                                  selectedTime === time ? "default" : "outline"
                                }
                                className="rounded-full px-3 py-1 text-xs"
                                onClick={() => handleTimeSelect(time)}
                              >
                                {time}
                              </Button>
                            ))
                          ) : (
                            <p className="px-8 text-xs font-semibold">
                              Não há horários disponíveis à tarde.
                            </p>
                          )}
                        </div>

                        {/* NOITE */}
                        <div className="flex items-center gap-2">
                          <Moon className="text-blue-500" />
                          <span className="text-sm font-semibold">Noite</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                          {eveningTimes.length > 0 ? (
                            eveningTimes.map((time) => (
                              <Button
                                key={time}
                                variant={
                                  selectedTime === time ? "default" : "outline"
                                }
                                className="rounded-full px-3 py-1 text-xs"
                                onClick={() => handleTimeSelect(time)}
                              >
                                {time}
                              </Button>
                            ))
                          ) : (
                            <p className="px-8 text-xs font-semibold">
                              Não há horários disponíveis à noite.
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedDate && (
                    <div className="p-3">
                      <BookingSummary
                        barbershop={barbershop}
                        service={service}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}
                  <SheetFooter className="p-3">
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
