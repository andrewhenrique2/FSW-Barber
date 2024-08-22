import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "../app/_lib/Auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default async function Home() {
  // Obtem a sessão do usuário
  const session = await getServerSession(authOptions)

  // Busca as barbearias e os agendamentos confirmados do usuário
  const [barbershops, popularBarbershops, bookings] = await Promise.all([
    db.barbershop.findMany(),
    db.barbershop.findMany({
      orderBy: {
        id: "asc",
      },
    }),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: {
              include: {
                barbershop: true,
              },
            },
          },
        })
      : Promise.resolve([]),
  ])

  return (
    <div>
      <Header />

      {/* Seção de boas-vindas */}
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name?.split(" ")[0]}!`
            : "Olá! Vamos agendar um corte hoje?"}
        </h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>

      {/* Seção de busca */}
      <div className="mt-6 px-5">
        <Search />
      </div>

      {/* Opções de busca rápida */}
      <div className="mt-6 flex gap-3 overflow-x-scroll px-2 [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => (
          <Button
            className="gap-2"
            variant="secondary"
            key={option.title}
            asChild
          >
            <Link href={`/barbershops?service=${option.title}`}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Link>
          </Button>
        ))}
      </div>

      {/* Imagem do banner */}
      <div className="relative mt-6 h-[150px] w-full">
        <Image
          src="/banner-01.png"
          alt="Agende nos melhores com FSW Barber"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-xl object-cover"
        />
      </div>

      {/* Seção de agendamentos */}
      {bookings.length > 0 ? (
        <>
          <h2 className="mb-3 pl-5 pt-6 text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>
          <div className="flex gap-3 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
            {bookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Você não tem agendamentos futuros.</p>
      )}

      {/* Barbearias recomendadas */}
      <div className="mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      {/* Barbearias populares */}
      <div className="mb-[4.5rem] mt-6">
        <h2 className="mb-3 px-5 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
