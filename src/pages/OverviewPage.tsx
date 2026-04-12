import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import {
  DollarSign, Package, Clock, BarChart3, Lock, AlertTriangle,
  MapPin, Bell, TrendingUp, TrendingDown, ArrowRight, Bot
} from "lucide-react";
import {
  kpis, stockDistribution, monthlyTrend, alerts,
  formatCurrency, formatNumber
} from "@/data/mockData";

const COLORS = [
  "hsl(0, 0%, 100%)", "hsl(0, 0%, 85%)", "hsl(0, 0%, 70%)",
  "hsl(0, 0%, 60%)", "hsl(0, 0%, 50%)", "hsl(0, 0%, 40%)",
  "hsl(0, 0%, 75%)", "hsl(0, 0%, 65%)", "hsl(0, 0%, 55%)", "hsl(0, 0%, 45%)"
];

const kpiCards = [
  { label: "Total de Materiais", value: formatNumber(kpis.totalMaterials), icon: Package, trend: "+1.8%", trendUp: true, path: "/volumetry" },
  { label: "Valor Parado 120+ dias", value: formatCurrency(kpis.aged120PlusValue), icon: Clock, trend: `${kpis.aged120PlusPercent}%`, trendUp: false, path: "/aging" },
  { label: "Inventário Coberto", value: `${kpis.inventoryPercent}%`, icon: BarChart3, trend: "+3.2%", trendUp: true, path: "/volumetry" },
  { label: "Materiais Bloqueados", value: formatNumber(kpis.blockedMaterials), icon: Lock, trend: formatCurrency(kpis.blockedValue), trendUp: false, path: "/blocked" },
  { label: "Total em TPEC", value: formatNumber(kpis.tpecTotal), icon: AlertTriangle, trend: formatCurrency(kpis.tpecValue), trendUp: false, path: "/tpec" },
  { label: "Sem Posição de Estoque", value: formatNumber(kpis.noPositionMaterials), icon: MapPin, trend: "-5.2%", trendUp: true, path: "/wood" },
  { label: "Alertas Críticos", value: String(kpis.criticalAlerts), icon: Bell, trend: "Este mês", trendUp: false, path: "#" },
];

const trendData = monthlyTrend.map(d => ({
  month: d.month,
  total: d.value / 1_000_000_000,
  aged: d.aged / 1_000_000_000,
}));

const pieData = stockDistribution.slice(0, 6).map(d => ({
  name: d.line.length > 20 ? d.line.slice(0, 20) + "…" : d.line,
  value: d.percent,
}));

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Card — Valor Total do Estoque */}
      <button
        onClick={() => navigate("/volumetry")}
        className="w-full text-left glass-card overflow-hidden relative group"
      >
        {/* Gradient background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/[0.02] pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-foreground/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative p-6 md:p-8">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Valor Total do Estoque</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Saldo consolidado de todas as linhas de estoque</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-secondary text-xs text-muted-foreground">
              BRL
            </div>
          </div>

          <div className="mt-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                {formatCurrency(kpis.totalStockValue)}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-sm text-muted-foreground">
                  Média mensal: <span className="text-foreground font-medium">{formatCurrency(kpis.totalStockValue * 0.98)}</span> <TrendingUp className="w-3 h-3 inline text-success" />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-muted-foreground">Comparado ao mês anterior</span>
              <span className="text-lg font-bold text-success">+ 2.1%</span>
            </div>
          </div>
        </div>
      </button>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <button
            key={card.label}
            onClick={() => navigate(card.path)}
            className="stat-card text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center gap-1 text-xs">
                {card.trendUp ? (
                  <TrendingUp className="w-3 h-3 text-success" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-destructive" />
                )}
                <span className={card.trendUp ? "text-success" : "text-destructive"}>
                  {card.trend}
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </button>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trend */}
        <div className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Evolução do Estoque</h3>
            <span className="text-xs text-muted-foreground">Últimos 9 meses</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 0%, 100%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(0, 0%, 100%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradAged" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 0%, 50%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(0, 0%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(0, 0%, 50%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0, 0%, 50%)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}B`} />
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)" }}
                formatter={(v: number) => [`R$ ${v.toFixed(2)} bi`]}
              />
              <Area type="monotone" dataKey="total" stroke="hsl(0, 0%, 100%)" fill="url(#gradTotal)" strokeWidth={2} name="Total" />
              <Area type="monotone" dataKey="aged" stroke="hsl(0, 0%, 50%)" fill="url(#gradAged)" strokeWidth={2} name="Parado 120+" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Distribuição por Linha</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)" }}
                formatter={(v: number) => [`${v}%`]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="text-foreground font-medium">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Alerts */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Alertas Recentes</h3>
            <span className="text-xs text-muted-foreground">{alerts.length} alertas</span>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  alert.severity === "critical" ? "bg-destructive animate-pulse-glow" :
                  alert.severity === "warning" ? "bg-warning" : "bg-success"
                }`} />
                <p className="text-sm text-foreground/80 leading-relaxed">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Preview */}
        <div className="glass-card p-5 glow-blue">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Agente de IA</h3>
              <p className="text-xs text-muted-foreground">Copiloto analítico KG WATCH</p>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="p-3 rounded-lg bg-secondary/50 text-sm text-foreground/80">
              <p>📊 <strong>Insight do dia:</strong> A linha de MRO concentra 39.8% de materiais acima de 120 dias que são oportunidades de redução, totalizando R$ 208 mi em potencial de liberação de capital.</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 text-sm text-foreground/80">
              <p>⚠️ <strong>Atenção:</strong> A meta de inventário de 80% para outubro requer aceleração — ritmo atual projeta apenas 76.5% de cobertura.</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/ai-agent")}
            className="flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            Abrir Agente de IA <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top stock lines bar chart */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Valor por Linha de Estoque</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stockDistribution.map(d => ({ ...d, valueBi: d.value / 1_000_000_000 }))} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" horizontal={false} />
            <XAxis type="number" tick={{ fill: "hsl(0, 0%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}B`} />
            <YAxis type="category" dataKey="line" width={180} tick={{ fill: "hsl(0, 0%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)" }}
              formatter={(v: number) => [`R$ ${v.toFixed(2)} bi`]}
            />
            <Bar dataKey="valueBi" name="Valor" radius={[0, 4, 4, 0]}>
              {stockDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
