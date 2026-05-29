import { useMemo } from 'react';
import { Bell, Briefcase, ChartColumn, Cog, GraduationCap, LayoutDashboard, Sparkles, TrendingUp, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Painel', icon: LayoutDashboard, to: '/dashboard' },
  { id: 'analisar', label: 'Analisar Ativo', icon: TrendingUp, to: '/dashboard?view=analisar' },
  { id: 'carteira', label: 'Carteira', icon: Briefcase, to: '/dashboard?view=carteira' },
  { id: 'ativos', label: 'Ativos', icon: ChartColumn, to: '/dashboard?view=ativos' },
  { id: 'aprendizado', label: 'Aprendizado', icon: GraduationCap, to: '/chat-ia' },
  { id: 'chat-ia', label: 'Chat IA', icon: Sparkles, to: '/chat-ia' },
  { id: 'configuracoes', label: 'Configurações', icon: Cog, to: '/configuracoes' },
  { id: 'alertas', label: 'Alertas', icon: Bell, to: '/dashboard?view=alertas' },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  const activeHref = useMemo(() => `${location.pathname}${location.search}`, [location.pathname, location.search]);

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-[#d7dde5] bg-[#f5f7fa] transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#d7dde5] p-5">
          <div>
            <h1 className="fm-display text-xl font-bold text-[#191c1e]">FinanceMind</h1>
            <p className="fm-shell-muted mt-1 text-xs uppercase tracking-[0.22em]">Controle de risco</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#d7dde5] text-[#5f6671] lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeHref === item.to;
              return (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                      isActive
                        ? 'bg-[#0b6d48] text-white shadow-sm'
                        : 'text-[#4b5563] hover:bg-[#e8edf2] hover:text-[#191c1e]'
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-[#d7dde5] p-4">
            <p className="fm-shell-muted text-sm">© 2026 FinanceMind</p>
        </div>
      </aside>
    </>
  );
}
