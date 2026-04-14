import { useState } from "react";
import {
  BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { volumetryData, formatNumber } from "@/data/mockData";
import { MapPin, CheckCircle2, Clock, Calendar, BarChart3, TrendingUp } from "lucide-react";

type Tab = "mapa" | "cronograma" | "evolucao";

export default function VolumetryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("mapa");
  const d = volumetryData;

  const kpiCards = [
    { label: "Inventários Total", value: d.kpis.total, icon: Calendar, color: "text-primary" },
    { label: "Em Andamento", value: d.kpis.emAndamento, icon: Clock, color: "text-warning" },
    { label: "Não Iniciados", value: d.kpis.naoIniciados, icon: BarChart3, color: "text-muted-foreground" },
    { label: "Finalizados", value: d.kpis.finalizados, icon: CheckCircle2, color: "text-success" },
  ];

  const tabs: { key: Tab; label: string }[] = [
    { key: "mapa", label: "Mapa Regional" },
    { key: "cronograma", label: "Cronograma" },
    { key: "evolucao", label: "Evolução Mensal" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map(k => (
          <div key={k.label} className="glass-card p-5 flex flex-col items-center text-center">
            <k.icon className={`w-5 h-5 mb-2 ${k.color}`} />
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{k.label}</p>
            <p className="text-3xl font-bold text-foreground">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "mapa" && <MapaRegional />}
      {activeTab === "cronograma" && <Cronograma />}
      {activeTab === "evolucao" && <Evolucao />}
    </div>
  );
}

/* ─── Mapa Regional ─── */
function MapaRegional() {
  const d = volumetryData;
  const totalProg = d.regions.reduce((s, r) => s + r.programados, 0);
  const totalConc = d.regions.reduce((s, r) => s + r.concluidos, 0);

  const regionColors = [
    "border-blue-400/40 bg-blue-500/5",
    "border-indigo-400/40 bg-indigo-500/5",
    "border-cyan-400/40 bg-cyan-500/5",
    "border-teal-400/40 bg-teal-500/5",
    "border-sky-400/40 bg-sky-500/5",
  ];

  return (
    <div className="space-y-4">
      {/* Visao Geral mini card */}
      <div className="glass-card p-4 flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Visão Geral</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Clock className="w-3.5 h-3.5 text-warning" />
          <span className="text-muted-foreground">Programados:</span>
          <span className="font-bold text-foreground">{totalProg}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          <span className="text-muted-foreground">Concluídos:</span>
          <span className="font-bold text-foreground">{totalConc}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-bold text-foreground">{totalProg + totalConc}</span>
        </div>
        {/* Progress bar */}
        <div className="flex-1 min-w-[120px]">
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-success transition-all"
              style={{ width: `${((totalConc / totalProg) * 100).toFixed(1)}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 text-right">
            {((totalConc / totalProg) * 100).toFixed(1)}% concluído
          </p>
        </div>
      </div>

      {/* Region cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {d.regions.map((r, i) => {
          const pct = r.programados > 0 ? ((r.concluidos / r.programados) * 100).toFixed(1) : "0";
          return (
            <div key={r.name} className={`rounded-xl border p-4 ${regionColors[i % regionColors.length]}`}>
              <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {r.name}
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                {r.states.join(", ")}
              </p>
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Clock className="w-3 h-3 text-warning" />
                    <span className="text-muted-foreground">Programados:</span>
                    <span className="font-bold text-foreground">{r.programados}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-3 h-3 text-success" />
                    <span className="text-muted-foreground">Concluídos:</span>
                    <span className="font-bold text-foreground">{r.concluidos}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">{pct}%</span>
                  <p className="text-[10px] text-muted-foreground">concluído</p>
                </div>
              </div>
              {/* mini bar */}
              <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full bg-success" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Cronograma ─── */
function Cronograma() {
  const d = volumetryData;

  const getStatusColor = (prev: number, real: number) => {
    if (prev === 0) return "";
    if (real === prev) return "bg-success/20 text-success";
    if (real > 0) return "bg-warning/20 text-warning";
    return "bg-muted";
  };

  // Totals per month
  const totals = d.monthLabels.map((_, mi) => {
    return d.cronograma.reduce(
      (acc, row) => {
        const m = row.meses[mi];
        return { prev: acc.prev + m.prev, pend: acc.pend + m.pend, real: acc.real + m.real };
      },
      { prev: 0, pend: 0, real: 0 }
    );
  });

  return (
    <div className="glass-card p-5">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-primary" />
        Cronograma — Inventários Programados | Tracking
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-muted-foreground sticky left-0 bg-card z-10 min-w-[50px]">UF</th>
              {d.monthLabels.map((m, i) => (
                <th key={i} colSpan={4} className="text-center py-2 px-1 text-muted-foreground border-l border-border/50">
                  {`${String(i + 1).padStart(2, "0")} - ${m.toLowerCase()}`}
                </th>
              ))}
            </tr>
            <tr className="border-b border-border text-muted-foreground">
              <th className="sticky left-0 bg-card z-10"></th>
              {d.monthLabels.map((_, i) => (
                <th key={i} className="border-l border-border/50" colSpan={4}>
                  <div className="flex">
                    <span className="flex-1 text-center px-0.5">Prev</span>
                    <span className="flex-1 text-center px-0.5">Pend</span>
                    <span className="flex-1 text-center px-0.5">Real</span>
                    <span className="flex-1 text-center px-0.5">%</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.cronograma.map(row => (
              <tr key={row.uf} className="border-b border-border/30 hover:bg-secondary/30">
                <td className="py-2 px-2 font-medium text-foreground sticky left-0 bg-card z-10">{row.uf}</td>
                {row.meses.map((m, mi) => {
                  const pct = m.prev > 0 ? ((m.real / m.prev) * 100).toFixed(0) : "";
                  const statusCls = getStatusColor(m.prev, m.real);
                  return (
                    <td key={mi} className="border-l border-border/30" colSpan={4}>
                      <div className="flex text-center">
                        <span className="flex-1 py-1.5 px-0.5 text-foreground">{m.prev || ""}</span>
                        <span className="flex-1 py-1.5 px-0.5 text-foreground">{m.pend || ""}</span>
                        <span className={`flex-1 py-1.5 px-0.5 rounded ${statusCls}`}>{m.real || ""}</span>
                        <span className={`flex-1 py-1.5 px-0.5 font-medium ${m.real === m.prev && m.prev > 0 ? "text-success" : m.real > 0 ? "text-warning" : "text-muted-foreground"}`}>
                          {pct ? `${pct}` : ""}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* Totals */}
            <tr className="border-t-2 border-border font-bold">
              <td className="py-2 px-2 text-foreground sticky left-0 bg-card z-10">Total</td>
              {totals.map((t, mi) => {
                const pct = t.prev > 0 ? ((t.real / t.prev) * 100).toFixed(1) : "";
                return (
                  <td key={mi} className="border-l border-border/30" colSpan={4}>
                    <div className="flex text-center">
                      <span className="flex-1 py-1.5 px-0.5 text-foreground">{t.prev}</span>
                      <span className="flex-1 py-1.5 px-0.5 text-foreground">{t.pend}</span>
                      <span className="flex-1 py-1.5 px-0.5 text-success">{t.real}</span>
                      <span className="flex-1 py-1.5 px-0.5 text-primary">{pct}</span>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-muted-foreground mt-3 text-right">Obs: Inventários finalizados até Fev/26</p>
    </div>
  );
}

/* ─── Evolução Mensal ─── */
function Evolucao() {
  const d = volumetryData;
  return (
    <div className="space-y-6">
      {/* Area chart */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Evolução Mensal do Inventário (%)
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={d.monthlyEvolution}>
            <defs>
              <linearGradient id="gradInv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} formatter={(v: number) => [`${v}%`]} />
            <Area type="monotone" dataKey="covered" stroke="hsl(var(--primary))" fill="url(#gradInv)" strokeWidth={2} name="Cobertura" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar by month — programados vs finalizados */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Programados vs Realizados por Mês</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={d.monthLabels.map((m, i) => {
            const t = d.cronograma.reduce((a, r) => ({ prev: a.prev + r.meses[i].prev, real: a.real + r.meses[i].real }), { prev: 0, real: 0 });
            return { month: m.slice(0, 3), programados: t.prev, realizados: t.real };
          })}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
            <Bar dataKey="programados" name="Programados" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="realizados" name="Realizados" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
