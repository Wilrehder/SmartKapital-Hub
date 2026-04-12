import { useState, useRef, useEffect } from "react";
import { Bot, Send, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  { role: "assistant", content: "Olá! Sou o agente de IA do **Smart Kapital Hub**. Posso ajudá-lo a analisar indicadores de estoque, identificar riscos e sugerir prioridades. Como posso ajudar?" },
];

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("120 dias") || q.includes("aging")) {
    return "📊 A análise de aging mostra **R$ 1,34 bi** em materiais acima de 120 dias (14,7% do estoque total).\n\n- **120–180 dias:** R$ 520 mi (34.200 itens)\n- **181–365 dias:** R$ 480 mi (28.700 itens)\n- **Acima de 365 dias:** R$ 340 mi (18.400 itens)\n\nA linha de **MRO Industrial e Florestal** concentra a maior parcela, com R$ 520 mi parados. Recomendo priorizar a análise dos 39,8% que representam oportunidades de redução.";
  }
  if (q.includes("mro") || q.includes("estratégico")) {
    return "🔍 No MRO Industrial e Florestal acima de 120 dias:\n\n- **Estratégico (manter):** R$ 312 mi — 8.420 itens (60,2%)\n- **Oportunidade de redução:** R$ 208 mi — 5.630 itens (39,8%)\n\nOs materiais estratégicos são peças críticas de manutenção sem substituto imediato. Os R$ 208 mi em oportunidade de redução representam materiais com alternativas disponíveis ou excesso de cobertura.";
  }
  if (q.includes("fornecedor")) {
    return "🏭 **Materiais no Fornecedor — Top 3:**\n\n1. **Voith Paper S.A.** — 3.200 itens, R$ 180 mi (72% inventariado)\n2. **Valmet Brasil Ltda.** — 2.800 itens, R$ 152 mi (65% inventariado)\n3. **SKF do Brasil Ltda.** — 2.400 itens, R$ 134 mi (80% inventariado)\n\n⚠️ Atenção: 32,7% do total não está inventariado (R$ 292 mi em risco de divergência).";
  }
  if (q.includes("tpec") || q.includes("sinistro")) {
    return "⚠️ **TPEC — Resumo:**\n\n- **4.213 materiais** aguardando baixa por sinistro\n- Valor total: **R$ 156 mi**\n- Tempo médio: **134 dias**\n\nA **Unidade Imperatriz** concentra a maior parcela com 980 itens (R$ 38 mi). Há 12 bobinas aguardando baixa há mais de 300 dias — recomendo priorizar resolução.";
  }
  if (q.includes("bloqueado") || q.includes("bloqueio")) {
    return "🔒 **Materiais Bloqueados:**\n\n- **12.847 itens** bloqueados, totalizando **R$ 287 mi**\n- Principal motivo: **Qualidade** (4.820 itens, R$ 108 mi)\n- Unidade com mais bloqueios: **Imperatriz** (3.200 itens)\n\nOs bloqueios por qualidade cresceram 18% vs mês anterior — sugiro investigar mudanças em processos de recebimento.";
  }
  if (q.includes("inventário") || q.includes("cobertura") || q.includes("volumetria")) {
    return "📈 **Inventário Anual — Status:**\n\n- Cobertura atual: **72,3%** (meta: 80% até outubro)\n- Melhor cobertura: **Celulose** com 82%\n- Pior cobertura: **Materiais de Terceiros** com 52%\n\n⚠️ No ritmo atual, a projeção é atingir apenas 76,5% até outubro. Recomendo intensificar contagens em Materiais de Terceiros e MRO.";
  }
  if (q.includes("madeira") || q.includes("muda")) {
    return "🌲 **Madeira em Campo:** Saldo de R$ 420 mi, com R$ 78 mi sem movimentação.\n\n🌱 **Mudas:** Saldo de R$ 150 mi. O Viveiro Nordeste (Mucuri) tem o maior aging médio de 78 dias — atenção para perdas por envelhecimento.";
  }
  if (q.includes("estoque total") || q.includes("valor total") || q.includes("visão geral")) {
    return "💰 **Visão Geral do Estoque:**\n\n- Valor total: **R$ 9,12 bi**\n- Total de materiais: **847.312**\n- Maior linha: **Papel – Produto Acabado** (R$ 2,85 bi, 31,3%)\n- Materiais sem posição: **3.892**\n- Alertas críticos este mês: **14**";
  }
  if (q.includes("risco") || q.includes("prioridade") || q.includes("recomend")) {
    return "🎯 **Top 5 Prioridades Recomendadas:**\n\n1. **MRO 120+ dias** — R$ 208 mi em oportunidade de redução\n2. **TPEC Imperatriz** — 12 bobinas há 300+ dias sem resolução\n3. **Inventário** — Acelerar contagens para atingir meta de 80%\n4. **Fornecedores não inventariados** — R$ 292 mi em risco\n5. **Estornos recorrentes** — 2.180 materiais com 3+ reversões\n\nPosso detalhar qualquer um desses pontos.";
  }
  return "Entendi sua pergunta. Com base nos dados do Smart Kapital Hub, posso analisar:\n\n- **Aging de materiais** (120+ dias)\n- **Materiais no fornecedor**\n- **Madeira e mudas**\n- **TPEC e sinistros**\n- **Materiais bloqueados e estornos**\n- **Volumetria e inventário**\n- **Riscos e prioridades**\n\nPode reformular sua pergunta ou escolher um dos temas acima?";
}

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
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
    }, 800 + Math.random() * 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
      <div className="glass-card flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="p-2 rounded-lg bg-primary/10"><Bot className="w-5 h-5 text-primary" /></div>
          <div>
            <h3 className="font-semibold text-foreground">Agente de IA — Smart Kapital Hub</h3>
            <p className="text-xs text-muted-foreground">Copiloto analítico de estoque e capital de giro</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
            <span className="text-xs text-success">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[70%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
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
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-foreground" />
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-secondary rounded-xl px-4 py-3 text-sm text-muted-foreground">
                Analisando dados<span className="animate-pulse">...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Pergunte sobre estoque, aging, inventário..."
              className="flex-1 h-10 px-4 rounded-lg bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button onClick={send} className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Send className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {["Qual linha tem mais aging?", "Riscos e prioridades", "Status do inventário", "Materiais bloqueados"].map(q => (
              <button key={q} onClick={() => { setInput(q); }} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
