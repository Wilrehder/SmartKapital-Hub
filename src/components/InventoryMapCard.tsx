import { useState } from "react";
import { MapPin } from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

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
  coordinates: [number, number]; // [longitude, latitude]
}

const STATUS_CONFIG: Record<InventoryStatus, { label: string; color: string; dotClass: string }> = {
  planned: { label: "Planejado", color: "hsl(0, 0%, 50%)", dotClass: "bg-muted-foreground" },
  in_progress: { label: "Em andamento", color: "hsl(45, 90%, 55%)", dotClass: "bg-warning" },
  completed: { label: "Concluído", color: "hsl(142, 60%, 45%)", dotClass: "bg-success" },
};

const mockLocations: InventoryLocation[] = [
  { id: "1", city: "Três Lagoas", state: "MS", responsible: "Carlos Mendes", unitType: "Fábrica de Celulose", stockGroup: "Celulose", period: "Out/2025", status: "completed", coordinates: [-51.68, -20.75] },
  { id: "2", city: "Ribas do Rio Pardo", state: "MS", responsible: "Ana Souza", unitType: "Fábrica de Celulose", stockGroup: "Celulose", period: "Nov/2025", status: "in_progress", coordinates: [-53.76, -20.44] },
  { id: "3", city: "Suzano", state: "SP", responsible: "Roberto Lima", unitType: "Sede Administrativa", stockGroup: "Papel", period: "Set/2025", status: "completed", coordinates: [-46.31, -23.54] },
  { id: "4", city: "Imperatriz", state: "MA", responsible: "Fernanda Costa", unitType: "Fábrica de Celulose", stockGroup: "Celulose", period: "Dez/2025", status: "planned", coordinates: [-47.47, -5.52] },
  { id: "5", city: "Aracruz", state: "ES", responsible: "Marcos Oliveira", unitType: "Fábrica de Celulose", stockGroup: "Celulose", period: "Out/2025", status: "completed", coordinates: [-40.27, -19.82] },
  { id: "6", city: "Açailândia", state: "MA", responsible: "Juliana Pereira", unitType: "Unidade Florestal", stockGroup: "Madeira", period: "Jan/2026", status: "planned", coordinates: [-47.05, -4.95] },
  { id: "7", city: "Mucuri", state: "BA", responsible: "Paulo Santos", unitType: "Fábrica de Celulose", stockGroup: "Celulose", period: "Nov/2025", status: "completed", coordinates: [-39.55, -18.08] },
  { id: "8", city: "Limeira", state: "SP", responsible: "Beatriz Alves", unitType: "Fábrica de Papel", stockGroup: "Papel", period: "Dez/2025", status: "planned", coordinates: [-47.40, -22.56] },
  { id: "9", city: "Jacareí", state: "SP", responsible: "Diego Martins", unitType: "Fábrica de Papel", stockGroup: "Papel", period: "Out/2025", status: "completed", coordinates: [-45.97, -23.30] },
  { id: "10", city: "São Miguel Arcanjo", state: "SP", responsible: "Luciana Ribeiro", unitType: "Unidade Florestal", stockGroup: "Madeira", period: "Nov/2025", status: "in_progress", coordinates: [-47.99, -23.88] },
  { id: "11", city: "Arujá", state: "SP", responsible: "Thiago Nunes", unitType: "Centro de Distribuição", stockGroup: "MRO", period: "Jan/2026", status: "planned", coordinates: [-46.32, -23.40] },
];

const BRAZIL_TOPO_URL = "https://cdn.jsdelivr.net/npm/brazilian-geo-data@1.0.0/geo/br-states.json";

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
        <div className="relative flex-1 min-h-[360px] rounded-lg bg-secondary/30 border border-border/50 overflow-hidden">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 580,
              center: [-54, -15],
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={BRAZIL_TOPO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="hsl(0, 0%, 18%)"
                    stroke="hsl(0, 0%, 25%)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "hsl(0, 0%, 22%)", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {mockLocations.map((loc) => {
              const config = STATUS_CONFIG[loc.status];
              return (
                <Marker
                  key={loc.id}
                  coordinates={loc.coordinates}
                  onMouseEnter={() => setHovered(loc.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {loc.status === "in_progress" && (
                    <circle r={8} fill={config.color} opacity={0.3} className="animate-ping" />
                  )}
                  <circle
                    r={5}
                    fill={config.color}
                    stroke="hsl(0, 0%, 7%)"
                    strokeWidth={2}
                    cursor="pointer"
                  />
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Tooltips rendered as HTML overlays */}
          {hovered && (() => {
            const loc = mockLocations.find(l => l.id === hovered);
            if (!loc) return null;
            const config = STATUS_CONFIG[loc.status];
            return (
              <div className="absolute top-4 left-4 w-56 p-3 rounded-lg bg-card border border-border shadow-xl z-50 text-xs space-y-1.5 pointer-events-none">
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
            );
          })()}
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
