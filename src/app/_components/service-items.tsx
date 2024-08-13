"use client"

import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { Sun, CloudSun, Moon } from "lucide-react"
import { format, set } from "date-fns"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { createBooking } from "../_actions/create-booking"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const MORNING_TIMES = ["09:00", "10:00", "11:00"]

const AFTERNOON_TIMES = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

const EVENING_TIMES = ["19:00", "20:00"]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return

      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        hours: hour,
        minutes: minute,
      })

      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })
      toast.success("Reservado com sucesso")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao reservar")
    }
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* IMAGEM */}
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageUrl}
            fill
            sizes="(100vw - 2rem) 100px"
            className="rounded-lg object-cover"
            alt={service.name}
          />
        </div>

        {/* DIREITA */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          {/* PREÇO E BOTAO */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle>Fazer reserva</SheetTitle>
                </SheetHeader>

                <div className="border-b border-solid">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
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
                        width: "22px",
                        height: "22px",
                      },
                      nav_button_next: {
                        width: "22px",
                        height: "22px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>

                {/* MANHA */}

                {selectedDay && (
                  <div className="flex flex-col gap-4 border-b border-solid p-2">
                    <div className="flex items-center gap-2">
                      <Sun className="text-yellow-500" />
                      <span className="font-semibold">Manhã</span>
                    </div>
                    <div className="scrollbar-thin flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      {MORNING_TIMES.map((time) => (
                        <Button
                          onClick={() => handleTimeSelect(time)}
                          key={time}
                          className="rounded-full"
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    {/* TARDE */}

                    <div className="flex items-center gap-2">
                      <CloudSun className="text-orange-500" />
                      <span className="font-semibold">Tarde</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      {AFTERNOON_TIMES.map((time) => (
                        <Button
                          onClick={() => handleTimeSelect(time)}
                          key={time}
                          className="rounded-full"
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    {/* NOITE */}

                    <div className="flex items-center gap-2">
                      <Moon className="text-blue-500" />
                      <span className="font-semibold">Noite</span>
                    </div>
                    <div className="scrollbar-thin flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      {EVENING_TIMES.map((time) => (
                        <Button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className="rounded-full"
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTime && selectedDay && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="p-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectedDay, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <p className="text-sm">{selectedTime}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {selectedTime && selectedDay && (
                  <SheetFooter className="px-5">
                    <SheetClose asChild>
                      <Button onClick={handleCreateBooking}>Confirmar</Button>
                    </SheetClose>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
