import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { Logo } from '@/components/ui/Logo'
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  BarChart3,
  MessageSquare,
  Calendar,
  ClipboardCheck,
  Settings,
  LogOut,
  Building2,
  Kanban,
  CheckSquare,
  HardDrive,
  Activity,
} from 'lucide-react'

const sidebarItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/crm', label: 'CRM', icon: Building2, dividerBefore: true },
  { href: '/admin/crm/pipeline', label: 'Pipeline', icon: Kanban, indent: true },
  { href: '/admin/crm/klanten', label: 'Klanten', icon: Users, indent: true },
  { href: '/admin/crm/taken', label: 'Taken', icon: CheckSquare, indent: true },
  { href: '/admin/crm/activiteiten', label: 'Activiteiten', icon: Activity, indent: true },
  { href: '/admin/drive', label: 'Drive', icon: HardDrive, dividerBefore: true },
  { href: '/admin/artikelen', label: 'Artikelen', icon: FileText, dividerBefore: true },
  { href: '/admin/categorieen', label: 'Categorieën', icon: FolderOpen },
  { href: '/admin/afspraken', label: 'Afspraken', icon: Calendar },
  { href: '/admin/quiz', label: 'Quiz resultaten', icon: ClipboardCheck },
  { href: '/admin/leads', label: 'Leads (oud)', icon: Users },
  { href: '/admin/chat', label: 'Chat logs', icon: MessageSquare },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
] as const

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // Check authentication
  if (!session?.user) {
    redirect('/admin/login')
  }

  // Check authorization
  if (!['ADMIN', 'EDITOR', 'WRITER'].includes(session.user.role)) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white fixed inset-y-0 left-0 z-50">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <Logo className="h-5" color="white" />
              <span className="block text-xs text-gray-400 ml-2">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  {'dividerBefore' in item && item.dividerBefore && (
                    <div className="border-t border-white/10 my-3" />
                  )}
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors ${
                      'indent' in item && item.indent ? 'ml-4 text-sm' : ''
                    }`}
                  >
                    <item.icon className={`${'indent' in item && item.indent ? 'w-4 h-4' : 'w-5 h-5'}`} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-brandGreen/20 flex items-center justify-center text-brandGreen font-medium">
                {session.user.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session.user.name}</p>
                <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
              </div>
            </div>
            <Link
              href="/api/auth/signout"
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Uitloggen
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-brandGreen transition-colors"
            >
              Bekijk website →
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/artikelen/nieuw"
              className="px-4 py-2 bg-brandGreen text-white rounded-lg hover:bg-brandGreenHover transition-colors text-sm font-medium"
            >
              + Nieuw artikel
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
