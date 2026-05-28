import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Chatbot } from "@/components/chatbot";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpenCheck,
  Trophy,
  Flame,
  Target,
  GraduationCap,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Circle,
  PlayCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/student")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — EduVision AI" },
      { name: "description", content: "Your personalized AI-powered study roadmap, career and scholarship dashboard." },
    ],
  }),
  component: StudentDashboard,
});

const progressData = [
  { week: "W1", hours: 4, mastery: 18 },
  { week: "W2", hours: 6, mastery: 28 },
  { week: "W3", hours: 7, mastery: 38 },
  { week: "W4", hours: 5, mastery: 46 },
  { week: "W5", hours: 9, mastery: 58 },
  { week: "W6", hours: 10, mastery: 68 },
  { week: "W7", hours: 8, mastery: 74 },
];

const skillsData = [
  { skill: "Math", value: 78 },
  { skill: "Coding", value: 65 },
  { skill: "Writing", value: 80 },
  { skill: "Research", value: 55 },
  { skill: "Design", value: 48 },
  { skill: "Communication", value: 72 },
];

type RoadmapStep = { title: string; status: "done" | "active" | "todo"; weeks: string };

const defaultRoadmap: RoadmapStep[] = [
  { title: "Foundations of Python", status: "done", weeks: "Wk 1-2" },
  { title: "Data Structures & Algorithms", status: "done", weeks: "Wk 3-4" },
  { title: "Intro to Machine Learning", status: "active", weeks: "Wk 5-7" },
  { title: "Build an AI Portfolio Project", status: "todo", weeks: "Wk 8-10" },
  { title: "Internship & Certification", status: "todo", weeks: "Wk 11-12" },
];

function generateRoadmap(interests: string, skills: string): { target: string; steps: RoadmapStep[] } {
  const blob = `${interests} ${skills}`.toLowerCase();
  const pick = (kw: RegExp, target: string, steps: string[]): { target: string; steps: string[] } | null =>
    kw.test(blob) ? { target, steps } : null;
  const found =
    pick(/(ai|machine|ml|data)/, "AI Engineer", [
      "Foundations of Python",
      "Data Structures & Algorithms",
      "Intro to Machine Learning",
      "Build an AI Portfolio Project",
      "Internship & Certification",
    ]) ||
    pick(/(design|ux|ui|figma)/, "UX / Product Designer", [
      "Design Principles & Color Theory",
      "Wireframing in Figma",
      "User Research & Testing",
      "Build a Portfolio Case Study",
      "Design Internship",
    ]) ||
    pick(/(climate|sustain|environment|green)/, "Climate Tech Specialist", [
      "Climate Science Foundations",
      "Sustainable Systems",
      "Renewable Energy Tech",
      "Capstone: Carbon Tracker App",
      "Green Internship Placement",
    ]) ||
    pick(/(business|finance|marketing|entrepreneur)/, "Business Strategist", [
      "Business Fundamentals",
      "Financial Literacy",
      "Marketing & Brand Strategy",
      "Launch a Mini-Startup",
      "Industry Mentorship",
    ]) ||
    pick(/(health|bio|medic|nurse)/, "Health Sciences Track", [
      "Human Biology Foundations",
      "Public Health & SDGs",
      "Research Methods",
      "Clinical Shadowing Project",
      "Health Internship",
    ]) ||
    { target: "AI Engineer", steps: defaultRoadmap.map((s) => s.title) };

  const steps: RoadmapStep[] = found.steps.map((title, i) => ({
    title,
    weeks: `Wk ${i * 2 + 1}-${i * 2 + 2}`,
    status: i < 2 ? "done" : i === 2 ? "active" : "todo",
  }));
  return { target: found.target, steps };
}

const allScholarships = [
  { name: "Vision 2030 STEM Grant", org: "Ministry of Education", amount: "$8,000", match: 96, deadline: "Aug 15", tags: ["ai", "stem", "tech", "data", "engineering"] },
  { name: "UNESCO SDG-4 Fellowship", org: "UNESCO", amount: "$12,000", match: 91, deadline: "Sep 02", tags: ["education", "research", "writing", "sdg"] },
  { name: "Future Leaders Award", org: "Global Youth Forum", amount: "$5,500", match: 87, deadline: "Oct 10", tags: ["business", "leadership", "entrepreneur"] },
  { name: "Green Innovators Grant", org: "Climate Council", amount: "$7,200", match: 89, deadline: "Nov 04", tags: ["climate", "sustain", "environment", "green"] },
  { name: "Creative Minds Fellowship", org: "Arts Foundation", amount: "$4,800", match: 84, deadline: "Dec 01", tags: ["design", "ux", "ui", "creative", "art"] },
  { name: "Health Pioneers Bursary", org: "WHO Youth", amount: "$6,500", match: 86, deadline: "Jan 15", tags: ["health", "bio", "medic", "nurse"] },
];

const careers = [
  { title: "AI Engineer", growth: "+34%", match: 94 },
  { title: "Data Scientist", growth: "+28%", match: 89 },
  { title: "UX Researcher", growth: "+21%", match: 81 },
];

const resources = [
  { title: "Intro to Neural Networks", type: "Video · 28 min", color: "from-violet-500 to-fuchsia-500" },
  { title: "Python for Data Analysis", type: "Course · 6h", color: "from-cyan-500 to-blue-500" },
  { title: "Storytelling with Data", type: "Book · PDF", color: "from-emerald-500 to-teal-500" },
  { title: "ML Project Templates", type: "Repo · GitHub", color: "from-amber-500 to-orange-500" },
];

function StudentDashboard() {
  const [interests, setInterests] = useState("AI, design, climate");
  const [skills, setSkills] = useState("Python, writing, public speaking");
  const [roadmap, setRoadmap] = useState<RoadmapStep[]>(defaultRoadmap);
  const [target, setTarget] = useState("AI Engineer");
  const [loading, setLoading] = useState(false);

  const blob = `${interests} ${skills}`.toLowerCase();
  const filteredScholarships = allScholarships
    .map((s) => ({ ...s, hits: s.tags.filter((t) => blob.includes(t)).length }))
    .sort((a, b) => b.hits - a.hits || b.match - a.match)
    .slice(0, 4);

  // dynamic progress derived from roadmap completion
  const doneCount = roadmap.filter((r) => r.status === "done").length;
  const masteryBase = Math.max(20, doneCount * 18);
  const dynamicProgress = progressData.map((p, i) => ({
    ...p,
    mastery: Math.min(95, masteryBase + i * 6),
  }));

  const regenerate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    const { target: t, steps } = generateRoadmap(interests, skills);
    setTarget(t);
    setRoadmap(steps);
    setLoading(false);
    toast.success("Roadmap regenerated", { description: `Tailored for ${t}` });
  };

  return (
    <DashboardShell title="Welcome back, Amira 👋" subtitle="Here's your personalized learning journey">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Study streak" value="14 days" delta="+3 this week" icon={Flame} />
        <StatCard label="Mastery" value="74%" delta="+8% this month" icon={Target} />
        <StatCard label="Hours learned" value="148h" delta="+12h this week" icon={BookOpenCheck} />
        <StatCard label="Scholarships matched" value="6" delta="3 new" icon={Trophy} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* AI input + roadmap */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Tell EduVision AI about you</CardTitle>
              <CardDescription>Refine your interests and skills — the roadmap re-personalizes instantly.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Your interests</label>
                <Input className="mt-1" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="e.g. AI, biology" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Your skills</label>
                <Input className="mt-1" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. Python, design" />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <Button onClick={regenerate} disabled={loading} className="bg-gradient-primary hover:opacity-90 shadow-glow">
                  {loading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Sparkles className="h-4 w-4 mr-1" />}
                  {loading ? "Generating…" : "Regenerate roadmap"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your AI Study Roadmap</CardTitle>
              <CardDescription>12-week path tailored to: {target}</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 rounded-lg border bg-muted/40 animate-pulse" />
                  ))}
                </div>
              ) : (
              <div className="space-y-3">
                {roadmap.map((step, i) => (
                  <div key={`${target}-${i}`} className="flex items-center gap-4 rounded-lg border p-4 hover:bg-muted/40 transition animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="shrink-0">
                      {step.status === "done" && <CheckCircle2 className="h-6 w-6 text-emerald-500" />}
                      {step.status === "active" && <PlayCircle className="h-6 w-6 text-primary animate-pulse" />}
                      {step.status === "todo" && <Circle className="h-6 w-6 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium truncate">{step.title}</div>
                        {step.status === "active" && <Badge className="bg-gradient-primary">In progress</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{step.weeks}</div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Weekly study hours & mastery growth</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dynamicProgress}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.68 0.22 280)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.68 0.22 280)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.72 0.2 200)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.72 0.2 200)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="mastery" stroke="oklch(0.68 0.22 280)" fill="url(#g1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="hours" stroke="oklch(0.72 0.2 200)" fill="url(#g2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Chatbot column */}
        <div className="space-y-6">
          <Chatbot />
          <Card>
            <CardHeader>
              <CardTitle>Skill Profile</CardTitle>
              <CardDescription>AI-assessed strengths</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <PolarRadiusAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                  <Radar dataKey="value" stroke="oklch(0.68 0.22 280)" fill="oklch(0.68 0.22 280)" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Career + Scholarships */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" /> Career recommendations</CardTitle>
            <CardDescription>Top matches based on your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {careers.map((c) => (
              <div key={c.title} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{c.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Industry growth {c.growth}</div>
                  </div>
                  <Badge variant="secondary">{c.match}% match</Badge>
                </div>
                <Progress value={c.match} className="mt-3 h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /> Scholarship matches</CardTitle>
            <CardDescription>Filtered by your interests · {filteredScholarships.length} matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredScholarships.map((s, i) => (
              <div key={s.name} className="rounded-lg border p-4 hover:shadow-elegant transition animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.org} · Deadline {s.deadline}</div>
                  </div>
                  <Badge className="bg-gradient-primary shrink-0">{s.match}%</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-lg font-bold text-gradient">{s.amount}</div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.success(`Application started: ${s.name}`, { description: "We'll email you next steps." })}
                    >
                      Apply <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Resources */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
          <CardDescription>Hand-picked by the AI for what you're learning this week</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((r) => (
            <div key={r.title} className={`rounded-xl p-5 bg-gradient-to-br ${r.color} text-white shadow-elegant hover:shadow-glow transition`}>
              <BookOpenCheck className="h-6 w-6 opacity-90" />
              <div className="mt-6 font-semibold">{r.title}</div>
              <div className="text-xs opacity-90 mt-1">{r.type}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}