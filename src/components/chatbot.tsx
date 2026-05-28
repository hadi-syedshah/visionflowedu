import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT =
  "You are EduVision AI, an education companion aligned with SDG 4 (Quality Education) and Vision 2030/2035. " +
  "Help students with career guidance, personalized study roadmaps, and scholarship recommendations. " +
  "Be concise, encouraging, and structured. Use **bold** for key terms when useful.";

async function callGemini(history: Msg[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!apiKey) {
    return "Missing VITE_GEMINI_API_KEY. Add it to your .env file and restart the dev server.";
  }
  const contents = history.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
      }),
    },
  );
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Gemini error ${res.status}: ${t}`);
  }
  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("") ?? "";
  return text || "Sorry, I couldn't generate a response.";
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
    try {
      const answer = await callGemini(next);
      setMessages((m) => [...m, { role: "assistant", content: answer }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `⚠️ ${e instanceof Error ? e.message : "Something went wrong."}` },
      ]);
    } finally {
      setTyping(false);
    }
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