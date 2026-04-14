import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, LayoutDashboard } from "lucide-react";
import smartKapitalLogo from "@/assets/smart-kapital-particle.png";
import sgsLogoGreen from "@/assets/sgs-logo-green.png";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("120 dias") || q.includes("aging")) {
    return "📊 A análise de aging mostra **R$ 1,34 bi** em materiais acima de 120 dias (14,7% do estoque total). A linha de **MRO Industrial e Florestal** concentra a maior parcela com R$ 520 mi parados.";
  }
  if (q.includes("fornecedor")) {
    return "🏭 **Top fornecedor:** Voith Paper S.A. — 3.200 itens, R$ 180 mi. ⚠️ 32,7% do total não está inventariado (R$ 292 mi em risco).";
  }
  if (q.includes("risco") || q.includes("prioridade") || q.includes("recomend")) {
    return "🎯 **Top 3 Prioridades:**\n1. MRO 120+ dias — R$ 208 mi em oportunidade\n2. TPEC Imperatriz — 12 bobinas há 300+ dias\n3. Inventário — Acelerar contagens para meta de 80%";
  }
  if (q.includes("estoque") || q.includes("valor") || q.includes("visão")) {
    return "💰 **Estoque total: R$ 9,12 bi** | 847.312 materiais | Maior linha: Papel – PA (R$ 2,85 bi, 31,3%) | 14 alertas críticos este mês.";
  }
  return "Posso analisar **aging**, **fornecedores**, **riscos**, **estoque** e mais. Reformule sua pergunta ou acesse o **Painel Executivo** para visualizações detalhadas.";
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const response = getResponse(userMsg.content);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setTyping(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* SGS logo top-right corner */}
      <div className="absolute top-6 right-8 z-20">
        <img src={sgsLogoGreen} alt="SGS Gestão de Inventários" className="h-32 object-contain" />
      </div>

      {/* Pulsing radial background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,_hsl(0_0%_35%)_0%,_transparent_65%)] animate-landing-drift-1 opacity-60" />
        <div className="absolute top-[30%] left-[30%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_hsl(0_0%_30%)_0%,_transparent_65%)] animate-landing-drift-2 opacity-50" />
        <div className="absolute top-[60%] left-[60%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_hsl(0_0%_28%)_0%,_transparent_65%)] animate-landing-drift-3 opacity-45" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl px-6">
        {/* Smart Kapital logo centered */}
        <img src={smartKapitalLogo} alt="Smart Kapital" className="h-44 object-contain mb-6" />
        <h1 className="text-5xl md:text-6xl font-light text-foreground tracking-tight text-center mb-3">
          Smart Kapital <span className="font-light">IA.</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base text-center mb-10">
          Inteligência analítica para gestão de capital de giro e estoque.
        </p>

        {/* Chat area */}
        {messages.length > 0 && (
          <div className="w-full max-h-60 overflow-y-auto mb-4 space-y-3 px-1">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-foreground text-background"
                    : "bg-secondary text-foreground"
                }`}>
                  {msg.content.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-1" : ""}>
                      {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={k}>{part.slice(2, -2)}</strong>
                          : part
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-secondary rounded-xl px-4 py-2.5 text-sm text-muted-foreground">
                  Analisando<span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input */}
        <div className="w-full flex gap-2 mb-6">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Pergunte sobre estoque, aging, riscos..."
            className="flex-1 h-12 px-5 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/30 border border-border"
          />
          <button
            onClick={send}
            className="h-12 w-12 rounded-xl bg-foreground flex items-center justify-center hover:bg-foreground/90 transition-colors"
          >
            <Send className="w-4 h-4 text-background" />
          </button>
        </div>

        {/* Quick suggestions */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {["Visão geral do estoque", "Riscos e prioridades", "Aging 120+ dias"].map(q => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="text-xs px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Dashboard button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
        >
          <LayoutDashboard className="w-4 h-4" />
          Acessar Painel Executivo
        </button>
      </div>
    </div>
  );
}
