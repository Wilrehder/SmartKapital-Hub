import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { supplierMaterials, formatCurrency, formatNumber } from "@/data/mockData";
import { CHART_PALETTE, BRAND_BLUE, TOOLTIP_STYLE as TT, AXIS_TICK, GRID_STROKE } from "@/lib/chartColors";

const COLORS = CHART_PALETTE.slice(0, 4);

export default function SupplierPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total de Materiais</p>
          <p className="text-2xl font-bold text-foreground">{formatNumber(supplierMaterials.summary.total)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Valor Total</p>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(supplierMaterials.summary.value)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Inventariado</p>
          <p className="text-2xl font-bold text-success">{supplierMaterials.summary.inventoried}%</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Não Inventariado</p>
          <p className="text-2xl font-bold text-destructive">{supplierMaterials.summary.notInventoried}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Supplier ranking */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Ranking de Fornecedores</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={supplierMaterials.bySupplier.map(s => ({
              name: s.supplier.length > 18 ? s.supplier.slice(0, 18) + "…" : s.supplier,
              valor: s.value / 1_000_000,
            }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={150} tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 14%, 18%)", borderRadius: 8, color: "hsl(210, 20%, 95%)" }} formatter={(v: number) => [`R$ ${v.toFixed(0)} mi`]} />
              <Bar dataKey="valor" fill="hsl(213, 70%, 50%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Aging breakdown */}
        <div className="glass-card p-5">
          <h3 className="font-semibold text-foreground mb-4">Aging dos Materiais no Fornecedor</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={supplierMaterials.agingBreakdown.map(d => ({ name: d.range, value: d.value / 1_000_000 }))} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 14%, 18%)", borderRadius: 8, color: "hsl(210, 20%, 95%)" }} formatter={(v: number) => [`R$ ${v.toFixed(0)} mi`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {supplierMaterials.agingBreakdown.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                <span className="text-muted-foreground">{d.range}</span>
                <span className="text-foreground ml-auto font-medium">{formatCurrency(d.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supplier table */}
      <div className="glass-card p-5">
        <h3 className="font-semibold text-foreground mb-4">Detalhamento por Fornecedor</h3>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-xs border-b border-border">
                <th className="text-left py-2">Fornecedor</th>
                <th className="text-right py-2">Itens</th>
                <th className="text-right py-2">Valor</th>
                <th className="text-right py-2">Inventariado</th>
                <th className="text-right py-2">Aging Médio</th>
              </tr>
            </thead>
            <tbody>
              {supplierMaterials.bySupplier.map((s) => (
                <tr key={s.supplier} className="border-b border-border/50 hover:bg-secondary/30">
                  <td className="py-2.5 text-foreground">{s.supplier}</td>
                  <td className="py-2.5 text-right text-foreground">{formatNumber(s.items)}</td>
                  <td className="py-2.5 text-right text-foreground font-medium">{formatCurrency(s.value)}</td>
                  <td className="py-2.5 text-right">
                    <span className={s.inventoried >= 70 ? "text-success" : "text-warning"}>{s.inventoried}%</span>
                  </td>
                  <td className="py-2.5 text-right">
                    <span className={s.avgDays > 180 ? "text-destructive" : "text-foreground"}>{s.avgDays} dias</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
