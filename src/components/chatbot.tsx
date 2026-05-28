import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const CANNED: Record<string, string> = {
  career: "Based on your interests, I'd recommend exploring **Data Science**, **AI Engineering**, or **UX Research**. Want me to build a 12-week roadmap for any of these?",
  scholarship: "I found 3 strong scholarships you may qualify for: **Vision 2030 STEM Grant**, **UNESCO SDG-4 Fellowship**, and **Future Leaders Award**. Shall I open the applications?",
  roadmap: "Here's a sample 4-step roadmap: 1) Foundations (Python + Math), 2) Core ML, 3) Projects portfolio, 4) Internship & certification. I can expand any step.",
  default: "I'm EduVision AI — ask me about careers, study plans, scholarships, or how AI can accelerate your learning journey.",
};

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("career") || q.includes("job")) return CANNED.career;
  if (q.includes("scholar") || q.includes("grant") || q.includes("fund")) return CANNED.scholarship;
  if (q.includes("road") || q.includes("plan") || q.includes("study")) return CANNED.roadmap;
  return CANNED.default;
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

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", content: reply(text) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <Card className="flex flex-col h-[560px] overflow-hidden">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center animate-pulse-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          EduVision AI Assistant
          <span className="ml-auto text-xs font-normal text-muted-foreground">Gemini-powered</span>
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