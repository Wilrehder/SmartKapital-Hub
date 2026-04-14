import { useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import { blockedData, formatCurrency, formatNumber } from "@/data/mockData";
import { Lock, RotateCcw, AlertTriangle, Repeat } from "lucide-react";

const REASON_COLORS = ["hsl(0, 72%, 51%)", "hsl(38, 92%, 50%)", "hsl(213, 70%, 50%)", "hsl(260, 60%, 55%)", "hsl(190, 70%, 50%)"];
const LINE_COLORS = ["hsl(0, 72%, 51%)", "hsl(38, 92%, 50%)", "hsl(213, 70%, 50%)", "hsl(260, 60%, 55%)", "hsl(142, 60%, 45%)", "hsl(190, 70%, 50%)", "hsl(320, 60%, 50%)"];
const TYPE_COLORS = ["hsl(0, 72%, 51%)", "hsl(38, 92%, 50%)", "hsl(213, 70%, 50%)", "hsl(142, 60%, 45%)", "hsl(260, 60%, 55%)", "hsl(190, 70%, 50%)"];

const TOOLTIP_STYLE = {
  background: "hsl(0, 0%, 10%)",
  border: "1px solid hsl(0, 0%, 16%)",
  borderRadius: 8,
  color: "hsl(0, 0%, 95%)",
  fontSize: 11,
};

function BlockedView() {
  const b = blockedData.blocked;

  const stockLineData = b.byStockLine.map(s => ({
    line: s.line,
    qualidade: s.qualidade / 1_000_000,
    inspecao: s.inspecao / 1_000_000,
    fiscal: s.fiscal / 1_000_000,
    avaria: s.avaria / 1_000_000,
    gerencial: s.gerencial / 1_000_000,
  }));

  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Bloqueado</p>
          <p className="text-xl font-bold text-foreground">{formatNumber(b.total)}</p>
          <p className="text-xs text-muted-foreground">itens</p>
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Valor Total</p>
          <p className="text-xl font-bold text-destructive">{formatCurrency(b.value)}</p>
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Motivos Distintos</p>
          <p className="text-xl font-bold text-foreground">{b.byReason.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Linhas Afetadas</p>
          <p className="text-xl font-bold text-foreground">{b.byStockLine.length}</p>
        </div>
      </div>

      {/* Por motivo + Por unidade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Por Motivo de Bloqueio</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={b.byReason.map(r => ({ name: r.reason, value: r.value / 1_000_000 }))} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {REASON_COLORS.map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`R$ ${v.toFixed(0)} mi`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {b.byReason.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: REASON_COLORS[i] }} />
                  <span className="text-muted-foreground">{r.reason}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">{formatNumber(r.items)} itens</span>
                  <span className="text-foreground font-medium">{formatCurrency(r.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Bloqueados por Unidade</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={b.byUnit.map(u => ({ unit: u.unit.replace("Unidade ", ""), valorMi: u.value / 1_000_000, items: u.items }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="unit" width={100} tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number, name: string) => [name === "valorMi" ? `R$ ${v.toFixed(0)} mi` : formatNumber(v), name === "valorMi" ? "Valor" : "Itens"]} />
              <Bar dataKey="valorMi" name="Valor (R$ mi)" fill="hsl(0, 72%, 51%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Por Linha de Estoque — stacked bar com motivos */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-foreground mb-4 text-sm">Bloqueados por Linha de Estoque × Motivo (R$ mi)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stockLineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
            <XAxis dataKey="line" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`R$ ${v.toFixed(0)} mi`]} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Bar dataKey="qualidade" name="Qualidade" stackId="a" fill={REASON_COLORS[0]} />
            <Bar dataKey="inspecao" name="Inspeção" stackId="a" fill={REASON_COLORS[1]} />
            <Bar dataKey="fiscal" name="Divergência Fiscal" stackId="a" fill={REASON_COLORS[2]} />
            <Bar dataKey="avaria" name="Avaria" stackId="a" fill={REASON_COLORS[3]} />
            <Bar dataKey="gerencial" name="Decisão Gerencial" stackId="a" fill={REASON_COLORS[4]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela detalhada por linha */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-foreground mb-4 text-sm">Detalhamento por Linha de Estoque</h3>
        <div className="overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground text-[10px] border-b border-border uppercase tracking-wider">
                <th className="text-left py-2 pr-2">Linha</th>
                <th className="text-right py-2 pr-2">Itens</th>
                <th className="text-right py-2 pr-2">Valor Total</th>
                <th className="text-right py-2 pr-2">Qualidade</th>
                <th className="text-right py-2 pr-2">Inspeção</th>
                <th className="text-right py-2 pr-2">Fiscal</th>
                <th className="text-right py-2 pr-2">Avaria</th>
                <th className="text-right py-2">Gerencial</th>
              </tr>
            </thead>
            <tbody>
              {b.byStockLine.map((s, i) => (
                <tr key={s.line} className="border-b border-border/50 hover:bg-secondary/30">
                  <td className="py-1.5 pr-2 font-medium text-foreground">{s.line}</td>
                  <td className="py-1.5 pr-2 text-right text-muted-foreground">{formatNumber(s.items)}</td>
                  <td className="py-1.5 pr-2 text-right font-medium text-foreground">{formatCurrency(s.value)}</td>
                  <td className="py-1.5 pr-2 text-right text-destructive">{formatCurrency(s.qualidade)}</td>
                  <td className="py-1.5 pr-2 text-right text-warning">{formatCurrency(s.inspecao)}</td>
                  <td className="py-1.5 pr-2 text-right text-primary">{formatCurrency(s.fiscal)}</td>
                  <td className="py-1.5 pr-2 text-right text-muted-foreground">{formatCurrency(s.avaria)}</td>
                  <td className="py-1.5 text-right text-muted-foreground">{formatCurrency(s.gerencial)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aging dos bloqueados */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-foreground mb-4 text-sm">Aging dos Materiais Bloqueados</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={b.byAging.map(a => ({ range: a.range, valorMi: a.value / 1_000_000, items: a.items }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
            <XAxis dataKey="range" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number, name: string) => [name === "valorMi" ? `R$ ${v.toFixed(0)} mi` : formatNumber(v), name === "valorMi" ? "Valor" : "Itens"]} />
            <Bar dataKey="valorMi" name="Valor (R$ mi)" fill="hsl(0, 72%, 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ReversalsView() {
  const r = blockedData.reversals;

  const evolutionData = r.byPeriod.map(p => ({
    month: p.month,
    consumo: p.consumo,
    baixa: p.baixa,
    valorMi: p.value / 1_000_000,
  }));

  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Estornos</p>
          <p className="text-xl font-bold text-foreground">{formatNumber(r.total)}</p>
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Impacto Financeiro</p>
          <p className="text-xl font-bold text-warning">{formatCurrency(r.value)}</p>
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Recorrentes (3+)</p>
          <p className="text-xl font-bold text-destructive">{formatNumber(r.recurrent)}</p>
        </div>
        <div className="stat-card">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tipos de Movimento</p>
          <p className="text-xl font-bold text-foreground">{r.byType.length}</p>
        </div>
      </div>

      {/* Por tipo de movimento + Por linha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Por Tipo de Movimento Estornado</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={r.byType.map(t => ({ name: t.type, value: t.value / 1_000_000 }))} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {TYPE_COLORS.map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`R$ ${v.toFixed(0)} mi`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {r.byType.map((t, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: TYPE_COLORS[i] }} />
                  <span className="text-muted-foreground">{t.type}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">{t.percent}%</span>
                  <span className="text-foreground font-medium">{formatCurrency(t.value)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Estornos por Linha de Estoque</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={r.byStockLine.map(s => ({ line: s.line, valorMi: s.value / 1_000_000, items: s.items }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="line" width={120} tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`R$ ${v.toFixed(0)} mi`]} />
              <Bar dataKey="valorMi" name="Valor (R$ mi)" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Evolução mensal — Consumo x Baixa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Evolução Mensal — Consumo vs Baixa</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="consumo" name="Est. Consumo" stackId="a" fill="hsl(0, 72%, 55%)" />
              <Bar dataKey="baixa" name="Est. Baixa" stackId="a" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4 text-sm">Evolução Impacto Financeiro (R$ mi)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v: number) => [`R$ ${v.toFixed(1)} mi`]} />
              <Line type="monotone" dataKey="valorMi" name="Valor (R$ mi)" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top materiais recorrentes */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Repeat className="w-4 h-4 text-destructive" />
          <h3 className="font-semibold text-foreground text-sm">Materiais com Estornos Recorrentes</h3>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground text-[10px] border-b border-border uppercase tracking-wider">
                <th className="text-left py-2 pr-2">Código</th>
                <th className="text-left py-2 pr-2">Descrição</th>
                <th className="text-left py-2 pr-2">Linha</th>
                <th className="text-center py-2 pr-2">Estornos</th>
                <th className="text-right py-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {r.topRecurrent.map(m => (
                <tr key={m.code} className="border-b border-border/50 hover:bg-secondary/30">
                  <td className="py-1.5 pr-2 font-mono text-primary">{m.code}</td>
                  <td className="py-1.5 pr-2 text-foreground/80">{m.desc}</td>
                  <td className="py-1.5 pr-2 text-muted-foreground">{m.line}</td>
                  <td className="py-1.5 pr-2 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-5 rounded bg-destructive/20 text-destructive text-[10px] font-bold">{m.estornos}</span>
                  </td>
                  <td className="py-1.5 text-right font-medium text-foreground">{formatCurrency(m.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function BlockedPage() {
  const [activeTab, setActiveTab] = useState<"blocked" | "reversals">("blocked");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tab selector */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("blocked")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "blocked"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
        >
          <Lock className="w-4 h-4" />
          Materiais Bloqueados
        </button>
        <button
          onClick={() => setActiveTab("reversals")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "reversals"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          Estornos
        </button>
      </div>

      {activeTab === "blocked" ? <BlockedView /> : <ReversalsView />}
    </div>
  );
}
