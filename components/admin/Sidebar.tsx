"use client"

import { LogOut } from 'lucide-react'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { menuItems } from '@/app/config/routes'
import AuthService from '@/services/AuthService'

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter();

  const logout = async () => {
    try {
      const result = await AuthService.Logout();
      if (result) {
        router.push("/auth");
      } 
    } catch (error) {
      console.log(error+': Giriş yapılırken bir hata oluştu')
    }
  }


  return (
    <aside className="bg-[--sidebar-background] text-[--sidebar-foreground] flex flex-col">
    {/* Header */}
    <div className="border-b px-6 py-4">
      <h2 className="font-semibold">Ürün Dashboard</h2>
    </div>

    {/* Menu */}
    <nav className="flex-grow">
      <ul>
        {menuItems.map((item) => (
          <li key={item.href} className={`p-4 ${pathname === item.href ? "bg-[--sidebar-accent] text-[--sidebar-accent-foreground]" : "hover:bg-[--sidebar-border]"}`}>
            <Link href={item.href} className="flex items-center">
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    {/* Logout Button */}
    <div className="border-t p-4">
      <button
        onClick={logout}
        className="w-full py-2 px-4 text-center rounded hover:bg-red-500"
      >
        <LogOut className="mr-2 h-4 w-4 inline-block" />
        Çıkış
      </button>
    </div>
  </aside>
);
}

