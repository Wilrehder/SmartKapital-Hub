import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import { woodAndSeedlings, formatCurrency, formatNumber } from "@/data/mockData";
import { TreePine, Sprout, TrendingUp, TrendingDown } from "lucide-react";
import { CHART_PALETTE, BRAND_BLUE, BRAND_DARK_BLUE, TOOLTIP_STYLE as TT_STYLE, AXIS_TICK, GRID_STROKE } from "@/lib/chartColors";

const wood = woodAndSeedlings.wood;
const seedlings = woodAndSeedlings.seedlings;

function formatM3(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(2)} Mi`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)} mil`;
  return v.toLocaleString("pt-BR");
}

function formatMil(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000).toFixed(0)} Mil`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)} Mil`;
  return v.toLocaleString("pt-BR");
}

function VarBadge({ value, mom, unit = "" }: { value: number; mom: number; unit?: string }) {
  const isPositive = value >= 0;
  return (
    <p className="text-xs text-muted-foreground mt-1">
      <span>Vs MoM {typeof mom === "number" && mom >= 1_000_000 ? formatCurrency(mom) : formatM3(mom)}</span>
      <span className={`ml-2 inline-flex items-center gap-0.5 ${isPositive ? "text-emerald-400" : "text-destructive"}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {Math.abs(value).toFixed(2)}%
      </span>
    </p>
  );
}

function WoodView() {
  const unfChartData = wood.byUNF.map(u => ({
    unf: u.unf,
    estDispoM3: u.estDispoM3 / 1_000_000,
    valorMi: u.valor / 1_000_000,
  }));

  const agingRangeM3 = wood.agingByRange.map(r => ({
    range: r.range,
    m3Mi: r.m3 / 1_000_000,
    valorMi: r.valor / 1_000_000,
  }));

  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Est. Dispo (M³)</p>
          <p className="text-xl font-bold text-foreground">{formatM3(wood.estDispoM3)}</p>
          <VarBadge value={wood.estDispoVar} mom={wood.estDispoMoM} />
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Valor Total</p>
          <p className="text-xl font-bold text-foreground">{formatCurrency(wood.valorTotal)}</p>
          <VarBadge value={wood.valorTotalVar} mom={wood.valorTotalMoM} />
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Aging Madeira (M³)</p>
          <p className="text-xl font-bold text-warning">{formatM3(wood.agingM3)}</p>
          <VarBadge value={wood.agingM3Var} mom={wood.agingM3MoM} />
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Valor Aging Madeira</p>
          <p className="text-xl font-bold text-warning">{formatCurrency(wood.valorAging)}</p>
          <VarBadge value={wood.valorAgingVar} mom={wood.valorAgingMoM} />
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Posições Indefinidas</p>
          <p className="text-xl font-bold text-destructive">{wood.posicoesIndef}</p>
          <VarBadge value={wood.posicoesIndefVar} mom={wood.posicoesIndefMoM} />
        </div>
      </div>

      {/* Estoque por UNF + Insights Madeira > 180 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card p-5 lg:col-span-2">
          <h3 className="font-semibold text-foreground mb-4">Estoque Disponível (M³) por UNF</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={unfChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="unf" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)", fontSize: 11 }}
                formatter={(v: number, name: string) => [name === "estDispoM3" ? `${v.toFixed(0)} Mi m³` : `R$ ${v.toFixed(0)} Mi`, name === "estDispoM3" ? "Est. Dispo" : "Valor Total"]}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="estDispoM3" name="Est. Dispo (Mi m³)" fill="hsl(213, 70%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="valorMi" name="Valor (R$ Mi)" fill="hsl(213, 70%, 35%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-3">Madeira Acima de 180 Dias</h3>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Distribuição por Unidade Florestal (UNF)</p>
          <div className="space-y-3 max-h-[400px] overflow-auto">
            {wood.above180ByUNF.map(u => (
              <div key={u.unf} className="border-b border-border/50 pb-2">
                <p className="text-xs font-bold text-foreground">{u.unf}: {formatM3(u.m3)} m³ - {formatCurrency(u.valor)}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{u.insight}</p>
              </div>
            ))}
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-4 mb-2">Distribuição por Classificação</p>
            {wood.byClassification.map(c => (
              <div key={c.tipo} className="border-b border-border/50 pb-2">
                <p className="text-xs font-bold text-foreground">{c.tipo}: {formatM3(c.m3)} m³ - {formatCurrency(c.valor)}</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{c.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Aging por faixa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Aging Última Movimentação em Estoque (M³)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={agingRangeM3}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="range" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)", fontSize: 11 }}
                formatter={(v: number) => [`${v.toFixed(2)} Mi m³`]}
              />
              <Bar dataKey="m3Mi" name="M³ (Mi)" fill="hsl(213, 70%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Aging Última Movimentação em Valores</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={agingRangeM3}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="range" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)", fontSize: 11 }}
                formatter={(v: number) => [`R$ ${v.toFixed(1)} Mi`]}
              />
              <Bar dataKey="valorMi" name="Valor (R$ Mi)" fill="hsl(213, 70%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const UNF_COLORS = [
  "hsl(213, 70%, 55%)",
  "hsl(142, 60%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(280, 60%, 55%)",
];

function SeedlingsView() {
  const unfBarQtd = seedlings.byUNF.map(u => ({
    unf: u.unf.replace("UNF ", ""),
    qtdTotal: u.qtdTotal / 1_000,
    qtdAcima60d: u.qtdAcima60d / 1_000,
  }));

  const unfBarValor = seedlings.byUNF.map(u => ({
    unf: u.unf.replace("UNF ", ""),
    valorTotal: u.valorTotal / 1_000_000,
    valorAcima60d: u.valorAcima60d / 1_000_000,
  }));

  // Build evolution line data
  const unfNames = seedlings.byUNF.map(u => u.unf);
  const evolutionQtd = seedlings.evolution.map(e => {
    const row: Record<string, any> = { month: e.month };
    e.data.forEach(d => { row[d.unf] = d.qtd / 1_000; });
    return row;
  });
  const evolutionValor = seedlings.evolution.map(e => {
    const row: Record<string, any> = { month: e.month };
    e.data.forEach(d => { row[d.unf] = d.valor / 1_000_000; });
    return row;
  });

  return (
    <div className="space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Qtd Total Mudas</p>
          <p className="text-xl font-bold text-foreground">{formatMil(seedlings.qtdTotal)}</p>
          <VarBadge value={seedlings.qtdTotalVar} mom={seedlings.qtdTotalMoM} />
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Valor Total Mudas</p>
          <p className="text-xl font-bold text-foreground">{formatMil(seedlings.valorTotal)}</p>
          <VarBadge value={seedlings.valorTotalVar} mom={seedlings.valorTotalMoM} />
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Qtd Mudas Acima 60d</p>
          <p className="text-xl font-bold text-warning">{formatMil(seedlings.qtdAcima60d)}</p>
          <VarBadge value={seedlings.qtdAcima60dVar} mom={seedlings.qtdAcima60dMoM} />
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Valor Mudas Acima 60d</p>
          <p className="text-xl font-bold text-warning">{formatMil(seedlings.valorAcima60d)}</p>
          <VarBadge value={seedlings.valorAcima60dMoM} mom={seedlings.valorAcima60dMoM} />
        </div>
      </div>

      {/* Mudas por UNF — Quantidade e Valor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Mudas por UNF — Quantidade (Mil)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={unfBarQtd}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="unf" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)", fontSize: 11 }}
                formatter={(v: number, name: string) => [`${v.toFixed(1)} Mil`, name === "qtdTotal" ? "Quantidade Total" : "Acima de 60 dias"]}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="qtdTotal" name="Quantidade Total" fill="hsl(213, 70%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="qtdAcima60d" name="Acima de 60 dias" fill="hsl(213, 70%, 35%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Mudas por UNF — Valor (R$ Mi)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={unfBarValor}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="unf" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)", fontSize: 11 }}
                formatter={(v: number, name: string) => [`R$ ${v.toFixed(1)} Mi`, name === "valorTotal" ? "Valor Total" : "Acima de 60 dias"]}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="valorTotal" name="Valor Total" fill="hsl(213, 70%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="valorAcima60d" name="Acima de 60 dias" fill="hsl(213, 70%, 35%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Evolução sem movimentação acima 60 dias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Evolução Mudas s/ Mov. Acima 60d (Qtd)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={evolutionQtd}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)", fontSize: 11 }}
                formatter={(v: number) => [`${v.toFixed(1)} Mil`]}
              />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              {unfNames.map((unf, i) => (
                <Line key={unf} type="monotone" dataKey={unf} name={unf.replace("UNF ", "")} stroke={UNF_COLORS[i]} strokeWidth={2} dot={{ r: 3 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Evolução Mudas s/ Mov. Acima 60d (R$ Mi)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={evolutionValor}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)", fontSize: 11 }}
                formatter={(v: number) => [`R$ ${v.toFixed(2)} Mi`]}
              />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              {unfNames.map((unf, i) => (
                <Line key={unf} type="monotone" dataKey={unf} name={unf.replace("UNF ", "")} stroke={UNF_COLORS[i]} strokeWidth={2} dot={{ r: 3 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default function WoodPage() {
  const [activeTab, setActiveTab] = useState<"madeira" | "mudas">("madeira");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tab selector */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("madeira")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "madeira"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
        >
          <TreePine className="w-4 h-4" />
          Madeira
        </button>
        <button
          onClick={() => setActiveTab("mudas")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "mudas"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
        >
          <Sprout className="w-4 h-4" />
          Mudas
        </button>
      </div>

      {activeTab === "madeira" ? <WoodView /> : <SeedlingsView />}
    </div>
  );
}
