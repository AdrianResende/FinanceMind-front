import { LayoutDashboard, TrendingUp, Briefcase, Bell, X } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ activeView, onNavigate, open, onClose }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analisar', label: 'Analisar Ativo', icon: TrendingUp },
    { id: 'carteira', label: 'Carteira', icon: Briefcase },
    { id: 'alertas', label: 'Alertas', icon: Bell },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-slate-800 bg-[#111827] transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700 p-5">
          <div>
            <h1 className="text-xl font-bold text-[#10B981]">AI Risk Advisor</h1>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">Risk control</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-300 lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                      activeView === item.id
                        ? 'bg-[#10B981] text-white shadow-lg shadow-emerald-500/10'
                        : 'text-[#9CA3AF] hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-700 p-4">
          <p className="text-sm text-[#9CA3AF]">© 2026 AI Risk Advisor</p>
        </div>
      </aside>
    </>
  );
}
