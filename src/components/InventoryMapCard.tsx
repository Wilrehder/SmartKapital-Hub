import { useState } from "react";
import { MapPin } from "lucide-react";

type InventoryStatus = "planned" | "in_progress" | "completed";

interface InventoryLocation {
  id: string;
  city: string;
  state: string;
  responsible: string;
  unitType: string;
  stockGroup: string;
  period: string;
  status: InventoryStatus;
  x: number; // % position on map
  y: number;
}

const STATUS_CONFIG: Record<InventoryStatus, { label: string; color: string; dotClass: string }> = {
  planned: { label: "Planejado", color: "hsl(0, 0%, 50%)", dotClass: "bg-muted-foreground" },
  in_progress: { label: "Em andamento", color: "hsl(45, 90%, 55%)", dotClass: "bg-warning" },
  completed: { label: "Concluído", color: "hsl(142, 60%, 45%)", dotClass: "bg-success" },
};

const mockLocations: InventoryLocation[] = [
  { id: "1", city: "Três Lagoas", state: "MS", responsible: "Carlos Mendes", unitType: "Fábrica de Celulose", stockGroup: "Celulose", period: "Out/2025", status: "completed", x: 46, y: 58 },
  { id: "2", city: "Ribas do Rio Pardo", state: "MS", responsible: "Ana Souza", unitType: "Fábrica de Celulose", stockGroup: "Celulose", period: "Nov/2025", status: "in_progress", x: 44, y: 61 },
  { id: "3", city: "Suzano", state: "SP", responsible: "Roberto Lima", unitType: "Sede Administrativa", stockGroup: "Papel", period: "Set/2025", status: "completed", x: 52, y: 63 },
  { id: "4", city: "Imperatriz", state: "MA", responsible: "Fernanda Costa", unitType: "Fábrica de Celulose", stockGroup: "Celulose", period: "Dez/2025", status: "planned", x: 39, y: 28 },
  { id: "5", city: "Aracruz", state: "ES", responsible: "Marcos Oliveira", unitType: "Fábrica de Celulose", stockGroup: "Celulose", period: "Out/2025", status: "completed", x: 60, y: 54 },
  { id: "6", city: "Açailândia", state: "MA", responsible: "Juliana Pereira", unitType: "Unidade Florestal", stockGroup: "Madeira", period: "Jan/2026", status: "planned", x: 38, y: 26 },
  { id: "7", city: "Mucuri", state: "BA", responsible: "Paulo Santos", unitType: "Fábrica de Celulose", stockGroup: "Celulose", period: "Nov/2025", status: "completed", x: 58, y: 49 },
  { id: "8", city: "Limeira", state: "SP", responsible: "Beatriz Alves", unitType: "Fábrica de Papel", stockGroup: "Papel", period: "Dez/2025", status: "planned", x: 50, y: 62 },
  { id: "9", city: "Jacareí", state: "SP", responsible: "Diego Martins", unitType: "Fábrica de Papel", stockGroup: "Papel", period: "Out/2025", status: "completed", x: 53, y: 62 },
  { id: "10", city: "São Miguel Arcanjo", state: "SP", responsible: "Luciana Ribeiro", unitType: "Unidade Florestal", stockGroup: "Madeira", period: "Nov/2025", status: "in_progress", x: 49, y: 64 },
  { id: "11", city: "Arujá", state: "SP", responsible: "Thiago Nunes", unitType: "Centro de Distribuição", stockGroup: "MRO", period: "Jan/2026", status: "planned", x: 53, y: 63 },
];

export default function InventoryMapCard() {
  const [hovered, setHovered] = useState<string | null>(null);

  const counts = {
    total: mockLocations.length,
    planned: mockLocations.filter(l => l.status === "planned").length,
    in_progress: mockLocations.filter(l => l.status === "in_progress").length,
    completed: mockLocations.filter(l => l.status === "completed").length,
  };

  return (
    <div className="glass-card p-5 lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Mapa de Inventários</h3>
        </div>
        <span className="text-xs text-muted-foreground">{counts.total} unidades</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Map */}
        <div className="relative flex-1 min-h-[320px] rounded-lg bg-secondary/30 border border-border/50 overflow-hidden">
          {/* Simplified Brazil SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-20" preserveAspectRatio="xMidYMid meet">
            <path
              d="M30,10 Q25,15 28,20 L26,25 Q22,28 25,32 L23,38 Q20,42 22,48 L25,52 Q28,55 30,58 L32,62 Q30,68 33,72 L38,75 Q42,78 45,80 L48,82 Q52,80 55,78 L58,74 Q62,70 60,65 L62,60 Q65,55 63,50 L65,45 Q68,40 65,35 L60,30 Q55,25 52,22 L48,18 Q44,14 40,12 L35,10 Q32,9 30,10 Z"
              fill="hsl(0, 0%, 30%)"
              stroke="hsl(0, 0%, 25%)"
              strokeWidth="0.5"
            />
          </svg>

          {/* Markers */}
          {mockLocations.map((loc) => {
            const config = STATUS_CONFIG[loc.status];
            const isHovered = hovered === loc.id;
            return (
              <div
                key={loc.id}
                className="absolute z-10"
                style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => setHovered(loc.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Pulse ring for in_progress */}
                {loc.status === "in_progress" && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ background: config.color, width: 14, height: 14, top: -1, left: -1 }}
                  />
                )}
                <div
                  className="w-3 h-3 rounded-full border-2 border-background cursor-pointer transition-transform hover:scale-150"
                  style={{ background: config.color }}
                />
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 rounded-lg bg-card border border-border shadow-xl z-50 text-xs space-y-1.5 pointer-events-none">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">{loc.city} - {loc.state}</span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                        style={{ background: `${config.color}22`, color: config.color }}
                      >
                        {config.label}
                      </span>
                    </div>
                    <div className="border-t border-border pt-1.5 space-y-1 text-muted-foreground">
                      <p><span className="text-foreground/70">Responsável:</span> {loc.responsible}</p>
                      <p><span className="text-foreground/70">Tipo:</span> {loc.unitType}</p>
                      <p><span className="text-foreground/70">Grupo:</span> {loc.stockGroup}</p>
                      <p><span className="text-foreground/70">Período:</span> {loc.period}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:w-44 flex lg:flex-col gap-3">
          {([
            { label: "Total", value: counts.total, dotClass: "bg-foreground" },
            { label: "Planejado", value: counts.planned, dotClass: STATUS_CONFIG.planned.dotClass },
            { label: "Em andamento", value: counts.in_progress, dotClass: STATUS_CONFIG.in_progress.dotClass },
            { label: "Concluído", value: counts.completed, dotClass: STATUS_CONFIG.completed.dotClass },
          ] as const).map((item) => (
            <div key={item.label} className="flex-1 p-3 rounded-lg bg-secondary/50 flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${item.dotClass}`} />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
              <span className="text-xl font-bold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
