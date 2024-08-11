import { MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import Link from "next/link"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarButton from "./sidebar"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-grow items-center justify-between p-5">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo FSW Barber"
            width={120}
            height={18}
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarButton />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
