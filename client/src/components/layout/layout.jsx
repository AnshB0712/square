import { CircleUser, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import logo from '../../assets/logo.svg'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { customAxios } from '../../api/axios'
import { toast } from 'sonner'
import { useAuthCtx } from '../../context/authContext'

const LogoutButton = () => {
  const { setUser, user } = useAuthCtx()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await customAxios.get('/auth/logout')
      setUser({
        token: '',
        role: [],
        name: '',
      })
      navigate('/')
      toast('User Logged Out.', {
        description: `${new Intl.DateTimeFormat('en-GB', {
          dateStyle: 'full',
          timeStyle: 'long',
          timeZone: 'Asia/Kolkata',
        }).format(Date.now())}`,
      })
    } catch (error) {
      toast('Error while Loging Out.', {
        description: error.response.data.message,
      })
    }
  }
  return !user.token ? (
    <></>
  ) : (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="w-full bg-red-500 text-white"
      size="sm"
    >
      Logout
    </Button>
  )
}

const AvatarDropdown = () => {
  const { user } = useAuthCtx()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel className="text-center">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-around">
          <p className="text-xs font-medium px-2 py-1.5">{user.name}</p>
          <Badge
            variant="outline"
            size="sm"
            style={{ borderColor: '#7549C4', color: '#7549C4' }}
          >
            {user?.role?.[0]}
          </Badge>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Layout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={false}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden rounded-xl"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <img src={logo} className="w-32 h-10" />
              </Link>
              <Link to="#" className="hover:text-foreground">
                Dashboard
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="relative">
          <Link to="/dashboard">
            <img src={logo} className="w-32 h-32" />
          </Link>
        </div>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <AvatarDropdown />
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
