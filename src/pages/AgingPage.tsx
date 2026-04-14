import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { agingData, formatCurrency, formatNumber } from "@/data/mockData";
import { AlertTriangle, TrendingDown, Shield, Activity, Zap, PackageMinus } from "lucide-react";

const COLORS = ["hsl(38, 92%, 50%)", "hsl(0, 72%, 51%)", "hsl(320, 60%, 50%)"];
const MRO_CLASS_COLORS = {
  healthy: "hsl(142, 60%, 45%)",
  attention: "hsl(38, 92%, 50%)",
  excess: "hsl(0, 72%, 51%)",
};

const mro = agingData.mroIntelligence;
const mroClassification = [
  { name: "Saudável", value: mro.classification.healthy.percent, color: MRO_CLASS_COLORS.healthy },
  { name: "Atenção", value: mro.classification.attention.percent, color: MRO_CLASS_COLORS.attention },
  { name: "Excesso", value: mro.classification.excess.percent, color: MRO_CLASS_COLORS.excess },
];

const mroInsights = [
  `${formatCurrency(mro.classification.excess.value)} em MRO com baixo consumo e alto aging`,
  `${mro.above180Percent}% do MRO está acima de 180 dias`,
  `Materiais críticos representam ${mro.criticalPercent}% do valor MRO`,
  `Cobertura média de ${mro.avgCoverageMonths} meses indica sobreestoque`,
];

function CustomBarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const isMRO = label?.includes("MRO");

  return (
    <div className="rounded-lg border border-border/50 bg-popover px-3 py-2 text-xs shadow-xl">
      <p className="font-medium text-foreground mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex justify-between gap-4 text-muted-foreground">
          <span>{p.name}</span>
          <span className="font-medium text-foreground">R$ {p.value.toFixed(0)} mi</span>
        </div>
      ))}
      {isMRO && (
        <div className="mt-2 pt-2 border-t border-border/50 space-y-1 text-muted-foreground">
          <div className="flex justify-between"><span>Cobertura média</span><span className="text-foreground">{mro.avgCoverageMonths} meses</span></div>
          <div className="flex justify-between"><span>Materiais críticos</span><span className="text-foreground">{mro.criticalPercent}%</span></div>
          <div className="flex justify-between"><span>Baixo consumo</span><span className="text-foreground">{mro.lowConsumptionPercent}%</span></div>
          <div className="flex justify-between"><span>Classificado excesso</span><span className="text-destructive">{mro.excessPercent}%</span></div>
        </div>
      )}
    </div>
  );
}

function CustomYTick({ x, y, payload }: any) {
  const isMRO = payload?.value?.includes("MRO");
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-4} y={0} dy={4} textAnchor="end" fontSize={11}
        fill={isMRO ? "hsl(38, 92%, 50%)" : "hsl(215, 15%, 55%)"}
        fontWeight={isMRO ? 600 : 400}
      >
        {payload.value}
      </text>
    </g>
  );
}

function CriticalityBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    A: "bg-destructive/20 text-destructive",
    M: "bg-warning/20 text-warning",
    B: "bg-muted text-muted-foreground",
    C: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center justify-center w-6 h-5 rounded text-[10px] font-bold ${colors[level] || "bg-muted text-muted-foreground"}`}>
      {level}
    </span>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const colors: Record<string, string> = {
    Alto: "bg-destructive/20 text-destructive",
    Médio: "bg-warning/20 text-warning",
    Baixo: "bg-secondary text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${colors[risk] || ""}`}>
      {risk}
    </span>
  );
}

function ActionBadge({ action }: { action: string }) {
  const isReduce = action === "Reduzir";
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
      isReduce ? "bg-warning/20 text-warning" : "bg-destructive/20 text-destructive"
    }`}>
      {action}
    </span>
  );
}

export default function AgingPage() {
  const byLine = agingData.byLine.map(d => ({
    line: d.line.length > 18 ? d.line.slice(0, 18) + "…" : d.line,
    fullLine: d.line,
    "120-180": d["120-180"] / 1_000_000,
    "181-365": d["181-365"] / 1_000_000,
    "365+": d["365+"] / 1_000_000,
    isMRO: d.line.includes("MRO"),
  }));

  const totalImpactValue = mro.impactRanking.reduce((sum, m) => sum + m.value, 0);
  const totalReductionValue = mro.reductionOpportunities.reduce((sum, m) => sum + m.value, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agingData.summary.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
              <span className="text-sm text-muted-foreground">{s.range}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(s.value)}</p>
            <p className="text-sm text-muted-foreground">{formatNumber(s.items)} itens · {s.percent}%</p>
          </div>
        ))}
      </div>

      {/* By line chart with MRO highlight */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Aging por Linha de Estoque (R$ mi)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={byLine} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 16%)" horizontal={false} />
            <XAxis type="number" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="line" width={160} tick={<CustomYTick />} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "hsl(0, 0%, 12%)" }} />
            <Bar dataKey="120-180" name="120–180 dias" stackId="a" fill={COLORS[0]} />
            <Bar dataKey="181-365" name="181–365 dias" stackId="a" fill={COLORS[1]} />
            <Bar dataKey="365+" name="365+ dias" stackId="a" fill={COLORS[2]} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* MRO Strategic Vision + Top Materials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* MRO — Visão Estratégica */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-warning" />
            <h3 className="font-semibold text-foreground">MRO — Visão Estratégica</h3>
          </div>

          {/* Mini indicator cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-secondary/50 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Valor Total MRO</p>
              <p className="text-sm font-bold text-foreground">{formatCurrency(mro.totalValue)}</p>
            </div>
            <div className="rounded-lg bg-secondary/50 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">% do Aging Total</p>
              <p className="text-sm font-bold text-foreground">{mro.percentOfAging}%</p>
            </div>
            <div className="rounded-lg bg-secondary/50 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Acima de 180 dias</p>
              <p className="text-sm font-bold text-warning">{mro.above180Percent}%</p>
            </div>
            <div className="rounded-lg bg-secondary/50 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Materiais Críticos</p>
              <p className="text-sm font-bold text-destructive">{mro.criticalPercent}%</p>
            </div>
          </div>

          {/* Classification donut + Insights */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Classificação Estratégica</p>
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie data={mroClassification} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                    {mroClassification.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "hsl(0, 0%, 10%)", border: "1px solid hsl(0, 0%, 16%)", borderRadius: 8, color: "hsl(0, 0%, 95%)", fontSize: 11 }}
                    formatter={(v: number) => [`${v}%`]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: MRO_CLASS_COLORS.healthy }} /> Saudável</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: MRO_CLASS_COLORS.attention }} /> Atenção</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: MRO_CLASS_COLORS.excess }} /> Excesso</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Insights Automáticos</p>
              <div className="space-y-2">
                {mroInsights.map((insight, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <Activity className="w-3 h-3 mt-0.5 shrink-0 text-warning" />
                    <p className="text-[11px] leading-tight text-foreground/80">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top materials table (existing) */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Materiais Mais Críticos</h3>
          <div className="overflow-auto max-h-72">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground text-xs border-b border-border">
                  <th className="text-left py-2 pr-2">Código</th>
                  <th className="text-left py-2 pr-2">Descrição</th>
                  <th className="text-right py-2 pr-2">Dias</th>
                  <th className="text-right py-2">Valor</th>
                </tr>
              </thead>
              <tbody>
                {agingData.topMaterials.map((m) => (
                  <tr key={m.code} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-2 pr-2 font-mono text-xs text-primary">{m.code}</td>
                    <td className="py-2 pr-2 text-foreground/80 text-xs">{m.desc}</td>
                    <td className="py-2 pr-2 text-right">
                      <span className={`text-xs font-medium ${m.days > 500 ? "text-destructive" : m.days > 365 ? "text-warning" : "text-foreground"}`}>{m.days}</span>
                    </td>
                    <td className="py-2 text-right text-foreground text-xs font-medium">{formatCurrency(m.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── MRO: Ação & Decisão ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Materiais Críticos (Risco Operacional) */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <h3 className="font-semibold text-foreground">MRO — Risco Operacional</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{mro.criticalMaterials.length} materiais</span>
          </div>
          <p className="text-[11px] text-muted-foreground mb-3">
            Materiais de alta criticidade com aging elevado — risco de impacto operacional mesmo parados.
          </p>
          <div className="overflow-auto max-h-80">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground text-[10px] border-b border-border uppercase tracking-wider">
                  <th className="text-left py-2 pr-1.5">Material</th>
                  <th className="text-left py-2 pr-1.5">Descrição</th>
                  <th className="text-right py-2 pr-1.5">Valor</th>
                  <th className="text-right py-2 pr-1.5">Aging</th>
                  <th className="text-center py-2 pr-1.5">Crit.</th>
                  <th className="text-center py-2 pr-1.5">Freq.</th>
                  <th className="text-right py-2">Cob.</th>
                </tr>
              </thead>
              <tbody>
                {mro.criticalMaterials.map((m) => (
                  <tr key={m.code} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-1.5 pr-1.5 font-mono text-primary">{m.code}</td>
                    <td className="py-1.5 pr-1.5 text-foreground/80 max-w-[140px] truncate">{m.desc}</td>
                    <td className="py-1.5 pr-1.5 text-right font-medium text-foreground">{formatCurrency(m.value)}</td>
                    <td className="py-1.5 pr-1.5 text-right">
                      <span className={m.aging > 500 ? "text-destructive font-medium" : m.aging > 300 ? "text-warning" : "text-foreground"}>{m.aging}d</span>
                    </td>
                    <td className="py-1.5 pr-1.5 text-center"><CriticalityBadge level={m.criticality} /></td>
                    <td className="py-1.5 pr-1.5 text-center text-muted-foreground">{m.frequency}</td>
                    <td className="py-1.5 text-right text-muted-foreground">{m.coverage}m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Oportunidade de Redução */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <PackageMinus className="w-4 h-4 text-warning" />
            <h3 className="font-semibold text-foreground">MRO — Oportunidade de Redução</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{formatCurrency(totalReductionValue)}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mb-3">
            Materiais de baixa criticidade e baixo consumo — candidatos a redução ou desmobilização.
          </p>
          <div className="overflow-auto max-h-80">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-muted-foreground text-[10px] border-b border-border uppercase tracking-wider">
                  <th className="text-left py-2 pr-1.5">Material</th>
                  <th className="text-left py-2 pr-1.5">Descrição</th>
                  <th className="text-right py-2 pr-1.5">Valor</th>
                  <th className="text-center py-2 pr-1.5">Últ. Consumo</th>
                  <th className="text-right py-2 pr-1.5">Aging</th>
                  <th className="text-center py-2">Ação</th>
                </tr>
              </thead>
              <tbody>
                {mro.reductionOpportunities.map((m) => (
                  <tr key={m.code} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-1.5 pr-1.5 font-mono text-primary">{m.code}</td>
                    <td className="py-1.5 pr-1.5 text-foreground/80 max-w-[140px] truncate">{m.desc}</td>
                    <td className="py-1.5 pr-1.5 text-right font-medium text-foreground">{formatCurrency(m.value)}</td>
                    <td className="py-1.5 pr-1.5 text-center text-muted-foreground">{m.lastConsumption}</td>
                    <td className="py-1.5 pr-1.5 text-right">
                      <span className={m.aging > 400 ? "text-destructive font-medium" : "text-warning"}>{m.aging}d</span>
                    </td>
                    <td className="py-1.5 text-center"><ActionBadge action={m.action} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ranking de Impacto */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-warning" />
          <h3 className="font-semibold text-foreground">MRO — Ranking de Impacto</h3>
          <span className="ml-auto text-xs text-muted-foreground">Top 10 · {formatCurrency(totalImpactValue)} em estoque parado</span>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-muted-foreground text-[10px] border-b border-border uppercase tracking-wider">
                <th className="text-center py-2 pr-2 w-8">#</th>
                <th className="text-left py-2 pr-2">Material</th>
                <th className="text-left py-2 pr-2">Descrição</th>
                <th className="text-right py-2 pr-2">Valor</th>
                <th className="text-right py-2 pr-2">Aging</th>
                <th className="text-center py-2 pr-2">Risco</th>
                <th className="text-left py-2">Impacto</th>
              </tr>
            </thead>
            <tbody>
              {mro.impactRanking.map((m, i) => {
                const barWidth = (m.value / mro.impactRanking[0].value) * 100;
                return (
                  <tr key={m.code} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-1.5 pr-2 text-center text-muted-foreground font-medium">{i + 1}</td>
                    <td className="py-1.5 pr-2 font-mono text-primary">{m.code}</td>
                    <td className="py-1.5 pr-2 text-foreground/80 max-w-[180px] truncate">{m.desc}</td>
                    <td className="py-1.5 pr-2 text-right font-medium text-foreground">{formatCurrency(m.value)}</td>
                    <td className="py-1.5 pr-2 text-right">
                      <span className={m.aging > 400 ? "text-destructive font-medium" : m.aging > 250 ? "text-warning" : "text-foreground"}>{m.aging}d</span>
                    </td>
                    <td className="py-1.5 pr-2 text-center"><RiskBadge risk={m.risk} /></td>
                    <td className="py-1.5 w-24">
                      <div className="w-full bg-secondary/50 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{
                            width: `${barWidth}%`,
                            background: m.risk === "Alto" ? "hsl(0, 72%, 51%)" : m.risk === "Médio" ? "hsl(38, 92%, 50%)" : "hsl(0, 0%, 50%)",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
