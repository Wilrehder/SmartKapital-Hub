import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import { tpecData, formatCurrency } from "@/data/mockData";
import { TrendingUp, TrendingDown, Lightbulb, AlertCircle } from "lucide-react";

function formatKg(v: number) {
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)} mil`;
  return v.toLocaleString("pt-BR");
}

function VarBadge({ value, mom, prefix = "" }: { value: number; mom: number; prefix?: string }) {
  const isPositive = value >= 0;
  const formattedMom = mom >= 1_000_000 ? `R$ ${(mom / 1_000).toFixed(0)} mil` : mom >= 1_000 ? `${(mom / 1_000).toFixed(0)} mil` : mom.toLocaleString("pt-BR");
  return (
    <p className="text-xs text-muted-foreground mt-1">
      <span>Últ.Mês: {prefix}{formattedMom}</span>
      <span className={`ml-2 inline-flex items-center gap-0.5 ${
        (value < 0 && prefix === "R$ ") ? "text-emerald-400" : 
        isPositive ? "text-emerald-400" : "text-destructive"
      }`}>
        {value < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
        {Math.abs(value).toFixed(2)}%
      </span>
    </p>
  );
}

const TOOLTIP_STYLE = {
  background: "hsl(0, 0%, 10%)",
  border: "1px solid hsl(0, 0%, 16%)",
  borderRadius: 8,
  color: "hsl(0, 0%, 95%)",
  fontSize: 11,
};

export default function TpecPage() {
  const d = tpecData;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Title */}
      <h2 className="text-lg font-bold text-foreground">Materiais de Sinistro Aguardando Baixa (TPEC)</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Est. Dispo (KG)</p>
          <p className="text-xl font-bold text-foreground">{formatKg(d.estDispoKg)}</p>
          <VarBadge value={d.estDispoVar} mom={d.estDispoMoM} />
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Est. Dispo Acima 90 Dias</p>
          <p className="text-xl font-bold text-warning">{formatKg(d.estDispoAcima90d)}</p>
          <VarBadge value={d.estDispoAcima90dVar} mom={d.estDispoAcima90dMoM} />
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Valor Total</p>
          <p className="text-xl font-bold text-foreground">R$ {(d.valorTotal / 1_000).toFixed(0)} mil</p>
          <VarBadge value={d.valorTotalVar} mom={d.valorTotalMoM} prefix="R$ " />
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Valor Acima 90 Dias</p>
          <p className="text-xl font-bold text-destructive">R$ {(d.valorAcima90d / 1_000).toFixed(0)} mil</p>
          <VarBadge value={d.valorAcima90dVar} mom={d.valorAcima90dMoM} prefix="R$ " />
        </div>
      </div>

      {/* Row: Est. por Local (KG) + Estoque KG/mês + Valor/mês */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Est. por local KG */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Est. Dispo (KG) por Local</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={d.byLocal} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" vertical={false} />
              <XAxis type="number" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1_000).toFixed(0)} mil`} />
              <YAxis type="category" dataKey="local" width={110} tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${(v / 1_000).toFixed(0)} mil kg`]} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="kgForaPrazo" name="Fora do Prazo" stackId="a" fill="hsl(0, 72%, 60%)" />
              <Bar dataKey="kgNoPrazo" name="No Prazo" stackId="a" fill="hsl(213, 70%, 55%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Estoque KG por mês */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Estoque Disponível em KG por Mês</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={d.monthlyKg}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1_000).toFixed(0)}`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${(v / 1_000).toFixed(0)} mil kg`]} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="foraPrazo" name="Fora do Prazo" stackId="a" fill="hsl(0, 72%, 60%)" />
              <Bar dataKey="noPrazo" name="No Prazo" stackId="a" fill="hsl(213, 70%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Valor do estoque por mês */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Valor do Estoque por Mês</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={d.monthlyValor}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `R$ ${(v / 1_000).toFixed(0)}`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`R$ ${(v / 1_000).toFixed(0)} mil`]} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="foraPrazo" name="Fora do Prazo" stackId="a" fill="hsl(0, 72%, 60%)" />
              <Bar dataKey="noPrazo" name="No Prazo" stackId="a" fill="hsl(213, 70%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row: Valor por local + Evolução linha + Highlights/Ações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Valor R$ por local */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Valor (R$) por Local</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={d.byLocal} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" vertical={false} />
              <XAxis type="number" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `R$ ${(v / 1_000).toFixed(0)}`} />
              <YAxis type="category" dataKey="local" width={110} tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`R$ ${(v / 1_000).toFixed(0)} mil`]} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="valorForaPrazo" name="Fora do Prazo" stackId="a" fill="hsl(0, 72%, 60%)" />
              <Bar dataKey="valorNoPrazo" name="No Prazo" stackId="a" fill="hsl(213, 70%, 55%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Evolução KG — No Prazo x Fora do Prazo (linha) */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Evolução (KG) — No Prazo x Fora do Prazo</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={d.evolutionKg}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1_000).toFixed(0)}`} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`${(v / 1_000).toFixed(0)} mil kg`]} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="foraPrazo" name="Fora do Prazo" stroke="hsl(0, 72%, 60%)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="noPrazo" name="No Prazo" stroke="hsl(213, 70%, 55%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Highlights + Ações */}
        <div className="space-y-4">
          <div className="glass-card p-4 border-l-4 border-l-warning">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-warning" />
              <h3 className="font-semibold text-foreground text-sm">Highlights</h3>
            </div>
            <ul className="space-y-2">
              {d.highlights.map((h, i) => (
                <li key={i} className="text-[11px] text-foreground/80 leading-relaxed flex gap-2">
                  <span className="text-warning mt-0.5">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-4 border-l-4 border-l-destructive">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <h3 className="font-semibold text-foreground text-sm">Ações</h3>
            </div>
            <ul className="space-y-2">
              {d.actions.map((a, i) => (
                <li key={i} className="text-[11px] text-foreground/80 leading-relaxed flex gap-2">
                  <span className="text-destructive mt-0.5">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
