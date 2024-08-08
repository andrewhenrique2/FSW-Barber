import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
export default function Home() {
  return (
    <div className="">
      <Header />
      {/* BUSCA /> */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Felipe!</h2>
        <p>Segunda-feira 05 de agosto.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input type="text" placeholder="Faca sua busca" />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        {/* IMAGEM /> */}

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/* AGENDAMENTO /> */}
        <Card className="mt-6">
          <CardContent className="flex justify-between p-0">
            {/* DIV DA ESQUERDA /> */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            {/* DIV DA DIREITA /> */}

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
