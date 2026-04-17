import * as React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/stores'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface NavbarProps {
  title?: string
  items?: NavItem[]
}

export function Navbar({ title = 'FinanceMind', items = [] }: NavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const defaultItems: NavItem[] = isAuthenticated
    ? [
        { label: 'Início', href: '/' },
        { label: 'Simulação', href: '/dashboard' },
      ]
    : [
        { label: 'Início', href: '/' },
        { label: 'Como Funciona', href: '/#como-funciona' },
      ]

  const navigationItems = items.length > 0 ? items : defaultItems

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Brand */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">{title}</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right Side - User Menu */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  fallback={user.name.charAt(0)}
                />
              </button>

              <DropdownMenu open={dropdownOpen}>
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => setDropdownOpen(false)}>
                  <Link to="/profile" className="flex w-full items-center">
                    👤 Perfil
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setDropdownOpen(false)}>
                  <Link to="/settings" className="flex w-full items-center">
                    ⚙️ Configurações
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => {
                    logout()
                    setDropdownOpen(false)
                    navigate('/')
                  }}
                  className="text-red-600 hover:bg-red-50"
                >
                  🚪 Sair
                </DropdownMenuItem>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - pode ser expandido */}
      <div className="md:hidden hidden border-t border-gray-200 px-4 py-2">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
