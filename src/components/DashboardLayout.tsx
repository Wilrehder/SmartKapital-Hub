import { useState } from "react";
import sgsLogoInventarios from "@/assets/sgs-logo-inventarios.png";
import smartKapitalAiIcon from "@/assets/smart-kapital-ai-icon.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Clock, Truck, TreePine, AlertTriangle,
  Lock, BarChart3, ChevronLeft, ChevronRight, Bell, Search, Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { kpis, alerts } from "@/data/mockData";

const menuItems = [
  { path: "/dashboard", label: "Visão Geral", icon: LayoutDashboard },
  { path: "/aging", label: "Aging 120+ dias", icon: Clock },
  { path: "/supplier", label: "Materiais no Fornecedor", icon: Truck },
  { path: "/wood", label: "Madeira e Mudas", icon: TreePine },
  { path: "/tpec", label: "TPEC", icon: AlertTriangle },
  { path: "/blocked", label: "Bloqueados e Estornos", icon: Lock },
  { path: "/volumetry", label: "Volumetria e Inventário", icon: BarChart3 },
  { path: "/ai-agent", label: "Smart Kapital AI", icon: null, customIcon: true },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const criticalCount = alerts.filter(a => a.severity === "critical").length;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
          <img src={sgsLogoInventarios} alt="SGS Gestão de Inventários" className="w-20 h-20 flex-shrink-0 object-scale-down" />
          {!collapsed && (
            <span className="font-bold text-foreground text-lg tracking-tight">
              Smart <span className="gradient-text">Kapital</span>
            </span>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                {item.customIcon ? (
                  <img src={smartKapitalAiIcon} alt="Smart Kapital AI" className="w-5 h-5 flex-shrink-0 object-contain" />
                ) : (
                  item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />
                )}
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-12 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-foreground">
              {menuItems.find(m => m.path === location.pathname)?.label || "Smart Kapital"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar material, código..."
                className="h-9 pl-9 pr-4 rounded-lg bg-secondary border-none text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-64"
              />
            </div>
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              title="Tela Inicial"
            >
              <Home className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {criticalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                  {criticalCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">AD</span>
              </div>
              <span className="text-sm text-foreground font-medium">Admin</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          {/* Pulsing radial background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_hsl(0_0%_35%)_0%,_transparent_65%)] animate-landing-drift-1 opacity-60" />
            <div className="absolute top-[30%] left-[30%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_hsl(0_0%_30%)_0%,_transparent_65%)] animate-landing-drift-2 opacity-50" />
            <div className="absolute top-[60%] left-[60%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_hsl(0_0%_28%)_0%,_transparent_65%)] animate-landing-drift-3 opacity-45" />
          </div>
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
