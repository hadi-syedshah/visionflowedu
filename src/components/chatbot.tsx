import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

function mockReply(input: string): string {
  const q = input.toLowerCase();
  if (/(scholarship|grant|funding|bursary)/.test(q)) {
    return "Here are **3 strong scholarship matches** based on your profile:\n• **Vision 2030 STEM Grant** — $8,000 · 96% match\n• **UNESCO SDG-4 Fellowship** — $12,000 · 91% match\n• **Future Leaders Award** — $5,500 · 87% match\n\nWant me to draft your application essay outline?";
  }
  if (/(career|job|profession|work)/.test(q)) {
    return "Top career paths I'd recommend right now:\n1. **AI Engineer** — 94% match, +34% industry growth\n2. **Data Scientist** — 89% match, +28% growth\n3. **UX Researcher** — 81% match, +21% growth\n\nTell me which one excites you and I'll build a 12-week roadmap.";
  }
  if (/(roadmap|study plan|learn|study|course)/.test(q)) {
    return "Here's a **personalized 4-step study roadmap**:\n• Weeks 1–2: Foundations of Python\n• Weeks 3–4: Data Structures & Algorithms\n• Weeks 5–7: Intro to Machine Learning\n• Weeks 8–10: Build an AI portfolio project\n\nWant me to add weekly checkpoints and resources?";
  }
  if (/(sdg|vision 20)/.test(q)) {
    return "EduVision AI is aligned with **SDG 4 (Quality Education)** and national **Vision 2030/2035** agendas — bringing personalized mentorship to every learner and preparing them for a knowledge-based, AI-augmented economy.";
  }
  if (/(hi|hello|hey|salam|marhaba)/.test(q)) {
    return "Hi there! 👋 I can help with **career guidance**, **study roadmaps**, or **scholarship matches**. What would you like to explore?";
  }
  if (/(thank)/.test(q)) {
    return "You're welcome! Keep learning — your future is being built one decision at a time. ✨";
  }
  return "Great question! Based on your profile, I'd suggest exploring **AI & data fields** — they offer the strongest growth and scholarship coverage. Try asking me about *careers*, *roadmaps*, or *scholarships*.";
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm EduVision AI 👋 — your career and study companion. What would you like to explore today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setTyping(true);
    await sleep(700 + Math.random() * 600);
    setMessages((m) => [...m, { role: "assistant", content: mockReply(text) }]);
    setTyping(false);
  };

  return (
    <Card className="flex flex-col h-[560px] overflow-hidden">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center animate-pulse-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          EduVision AI Assistant
          <span className="ml-auto text-xs font-normal text-muted-foreground">Demo mode</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
              {m.role === "assistant" && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-primary grid place-items-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-gradient-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm",
                )}
                dangerouslySetInnerHTML={{ __html: m.content.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
              />
              {m.role === "user" && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-secondary grid place-items-center">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-2">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-primary grid place-items-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-foreground/60"
                    style={{ animation: `blink 1.2s ${i * 0.15}s infinite ease-in-out` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="border-t p-3 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about careers, scholarships, study plans…"
          />
          <Button onClick={send} className="bg-gradient-primary hover:opacity-90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}