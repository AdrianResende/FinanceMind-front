import { useState } from 'react';
import { Bell, ChevronDown, HelpCircle, Menu, Search } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores';
import { Sidebar } from '@/app/components/Sidebar';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#191c1e]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="min-h-screen lg:pl-60">
        <header className="sticky top-0 z-20 border-b border-[#d7dde5] bg-[#f5f7fa]/95 backdrop-blur">
          <div className="flex min-h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 lg:gap-4">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#d7dde5] bg-[#f5f7fa] text-[#191c1e] lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu size={18} />
              </button>

              <div className="hidden h-10 min-w-[340px] items-center gap-2 rounded-md border border-[#cfd6df] bg-white px-3 shadow-[0_1px_0_rgba(15,23,42,0.02)] md:flex">
                <Search size={16} className="text-[#75777e]" />
                <input
                  type="search"
                  placeholder="Buscar ativos ou temas..."
                  className="w-full border-0 bg-transparent text-sm text-[#191c1e] outline-none placeholder:text-[#8a9099]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#5f6671] transition hover:bg-white hover:text-[#191c1e]"
                aria-label="Notificações"
              >
                <Bell size={18} />
              </button>

              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#5f6671] transition hover:bg-white hover:text-[#191c1e]"
                aria-label="Ajuda"
              >
                <HelpCircle size={18} />
              </button>

              <button
                type="button"
                className="hidden items-center gap-2 rounded-md bg-[#0b6d48] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#095739] md:inline-flex"
              >
                <span className="text-base leading-none">★</span>
                Melhorar Plano
              </button>

              <div className="hidden items-center gap-3 border-l border-[#d7dde5] pl-4 sm:flex">
                <div className="text-right leading-tight">
                  <p className="text-sm font-semibold text-[#191c1e]">Investidor Silva</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#75777e]">Premium member</p>
                </div>
                <img
                  alt="Perfil do usuário"
                  className="h-10 w-10 rounded-full border border-[#d7dde5] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80"
                />
                <ChevronDown size={16} className="text-[#75777e]" />
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="hidden rounded-md border border-[#cfd6df] px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#191c1e] transition hover:bg-white md:inline-flex"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}