import { Link } from 'react-router-dom';
import { BrandContainer, RiskPill, SectionHeading, Surface } from '@/components/shared';
import { Button } from '@/components/ui/button';

const tokenGroups = [
  {
    title: 'Brand / Ink',
    items: [
      { token: '--fm-bg-light', value: '#edf1f3' },
      { token: '--fm-bg-soft', value: '#f7f9fb' },
      { token: '--fm-ink-strong', value: '#061225' },
      { token: '--fm-ink', value: '#0d1726' },
      { token: '--fm-ink-muted', value: '#5a657a' },
    ],
  },
  {
    title: 'Shell (painel)',
    items: [
      { token: '--fm-shell-bg', value: '#0b1220' },
      { token: '--fm-shell-surface', value: '#111827' },
      { token: '--fm-shell-surface-soft', value: '#1f2937' },
      { token: '--fm-shell-border', value: '#334155' },
      { token: '--fm-shell-muted', value: '#9ca3af' },
    ],
  },
  {
    title: 'Status',
    items: [
      { token: '--fm-accent', value: '#10b981' },
      { token: '--fm-warning', value: '#f59e0b' },
      { token: '--fm-danger', value: '#ef4444' },
    ],
  },
];

export default function DesignSystemDocs() {
  return (
    <div className="fm-page py-10">
      <BrandContainer className="space-y-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">FinanceMind UI</p>
          <h1 className="fm-display mt-3 text-4xl font-bold text-slate-900">Design System Interno</h1>
          <p className="fm-muted mt-3 max-w-3xl leading-7">
            Esta pagina consolida tokens e componentes prontos para acelerar novas telas e manter o projeto consistente.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="brand">
              <Link to="/">Voltar para Home</Link>
            </Button>
            <Button asChild variant="brandOutline">
              <Link to="/dashboard">Abrir Dashboard</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="fm-display text-2xl font-bold text-slate-900">1. Tokens</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {tokenGroups.map((group) => (
              <article key={group.title} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="fm-display text-lg font-semibold text-slate-900">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.token} className="flex items-center justify-between gap-3 text-sm">
                      <div>
                        <p className="font-medium text-slate-800">{item.token}</p>
                        <p className="text-slate-500">{item.value}</p>
                      </div>
                      <span
                        className="h-7 w-7 rounded-md border border-slate-300"
                        style={{ backgroundColor: item.value }}
                        aria-hidden="true"
                      />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="fm-display text-2xl font-bold text-slate-900">2. Componentes Prontos</h2>
          <div className="fm-shell rounded-2xl p-6">
            <SectionHeading
              kicker="primitivas compartilhadas"
              title="SectionHeading + Surface + RiskPill"
              description="Padrao principal para blocos no dashboard protegido."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Surface className="p-4">
                <h3 className="fm-display text-xl font-semibold text-white">Surface</h3>
                  <p className="fm-shell-muted mt-2">Contêiner padrão para cards no shell escuro.</p>
                <div className="mt-4 flex gap-2">
                  <RiskPill level="low" label="Baixo" />
                  <RiskPill level="medium" label="Medio" />
                  <RiskPill level="high" label="Alto" />
                </div>
              </Surface>

              <Surface soft className="p-4">
                <h3 className="fm-display text-xl font-semibold text-white">Surface soft</h3>
                  <p className="fm-shell-muted mt-2">Versão para blocos secundários e placeholders.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="brand">Brand</Button>
                    <Button variant="brandOutline">Contorno da marca</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </Surface>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="fm-display text-2xl font-bold text-slate-900">3. Regras de Uso Rapido</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
              <li>Use Surface para cards do painel autenticado.</li>
              <li>Use RiskPill para estados de risco sem repetir classes soltas.</li>
              <li>Use variantes do Button em vez de classes inline de cor.</li>
              <li>Evite hex avulso: prefira tokens e classes fm-.</li>
          </ul>
        </section>
      </BrandContainer>
    </div>
  );
}
