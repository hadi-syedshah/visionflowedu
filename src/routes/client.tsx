import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Building2, Eye, Users, Briefcase, Plus, Pencil, Trash2, MapPin,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar,
} from "recharts";

export const Route = createFileRoute("/client")({
  head: () => ({
    meta: [
      { title: "Client Dashboard — EduVision AI" },
      { name: "description", content: "Post opportunities, view candidate insights and student interest analytics." },
    ],
  }),
  component: ClientDashboard,
});

const interestData = [
  { week: "W1", views: 240, applied: 38 },
  { week: "W2", views: 320, applied: 52 },
  { week: "W3", views: 410, applied: 71 },
  { week: "W4", views: 380, applied: 64 },
  { week: "W5", views: 520, applied: 92 },
  { week: "W6", views: 610, applied: 110 },
];

const candidateFields = [
  { field: "Engineering", count: 184 },
  { field: "Data / AI", count: 152 },
  { field: "Design", count: 98 },
  { field: "Business", count: 76 },
  { field: "Health", count: 54 },
];

type Opportunity = { title: string; type: string; location: string; views: number; applied: number; status: "Active" | "Paused" };
const initialOpportunities: Opportunity[] = [
  { title: "AI Research Internship", type: "Internship", location: "Remote", views: 1240, applied: 86, status: "Active" },
  { title: "Climate Tech Scholarship", type: "Scholarship", location: "Global", views: 980, applied: 142, status: "Active" },
  { title: "Junior Data Analyst", type: "Job", location: "Riyadh", views: 720, applied: 54, status: "Active" },
  { title: "UX Design Bootcamp", type: "Program", location: "Hybrid", views: 530, applied: 38, status: "Paused" },
];

const candidates = [
  { name: "Layla H.", role: "AI Engineer track", match: 96, location: "Cairo" },
  { name: "Omar K.", role: "Data Scientist track", match: 92, location: "Riyadh" },
  { name: "Sara N.", role: "UX Researcher track", match: 88, location: "Dubai" },
  { name: "Ahmed F.", role: "AI Engineer track", match: 85, location: "Amman" },
];

function ClientDashboard() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [oppTitle, setOppTitle] = useState("");
  const [oppType, setOppType] = useState("");
  const [oppDesc, setOppDesc] = useState("");

  const publishOpportunity = () => {
    if (!oppTitle.trim()) {
      toast.error("Please enter a title before publishing.");
      return;
    }
    const fresh: Opportunity = {
      title: oppTitle.trim(),
      type: oppType.trim() || "Job",
      location: "Remote",
      views: 0,
      applied: 0,
      status: "Active",
    };
    setOpportunities((o) => [fresh, ...o]);
    setOppTitle("");
    setOppType("");
    setOppDesc("");
    toast.success("Opportunity published", { description: fresh.title });
  };

  const removeOpportunity = (title: string) => {
    setOpportunities((o) => o.filter((x) => x.title !== title));
    toast("Opportunity removed", { description: title });
  };

  return (
    <DashboardShell title="Organization Dashboard" subtitle="Future Foundation · Education Partner">
      {/* Org profile */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-primary" />
        <CardContent className="-mt-10 pb-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="h-20 w-20 rounded-2xl bg-card border-4 border-card shadow-elegant grid place-items-center">
                <Building2 className="h-9 w-9 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Future Foundation</h2>
                <p className="text-sm text-muted-foreground">Education partner · 12 active opportunities · est. 2018</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => toast("Edit profile", { description: "Demo: profile editor would open here." })}>Edit profile</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Opportunity views" value="12,840" delta="+18% this month" icon={Eye} />
        <StatCard label="Applications" value="1,284" delta="+212 this week" icon={Users} />
        <StatCard label="Active postings" value="12" delta="2 new this week" icon={Briefcase} />
        <StatCard label="Avg. match score" value="87%" delta="+4 pts MoM" icon={Building2} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student Interest</CardTitle>
            <CardDescription>Views & applications across your opportunities</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={interestData}>
                <defs>
                  <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.68 0.22 280)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.68 0.22 280)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.2 200)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.72 0.2 200)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="views" stroke="oklch(0.68 0.22 280)" fill="url(#cg1)" strokeWidth={2} />
                <Area type="monotone" dataKey="applied" stroke="oklch(0.72 0.2 200)" fill="url(#cg2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Candidate Fields</CardTitle>
            <CardDescription>Top tracks applying</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={candidateFields} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis dataKey="field" type="category" stroke="var(--muted-foreground)" fontSize={12} width={80} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="count" fill="oklch(0.68 0.22 280)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Opportunity Management</CardTitle>
            <CardDescription>Your postings and their performance</CardDescription>
          </div>
          <Button onClick={() => document.getElementById("quick-post")?.scrollIntoView({ behavior: "smooth" })} className="bg-gradient-primary hover:opacity-90"><Plus className="h-4 w-4 mr-1" /> Post opportunity</Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map((o) => (
                  <TableRow key={o.title}>
                    <TableCell className="font-medium">{o.title}</TableCell>
                    <TableCell><Badge variant="secondary">{o.type}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{o.location}</TableCell>
                    <TableCell>{o.views.toLocaleString()}</TableCell>
                    <TableCell>{o.applied}</TableCell>
                    <TableCell>
                      <Badge className={o.status === "Active" ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15" : "bg-muted text-muted-foreground hover:bg-muted"}>
                        {o.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => toast(`Editing ${o.title}`, { description: "Demo: editor would open here." })}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeOpportunity(o.title)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Candidate Insights</CardTitle>
            <CardDescription>Top AI-matched applicants this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {candidates.map((c) => (
              <div key={c.name} className="flex items-center gap-4 rounded-lg border p-4">
                <div className="h-10 w-10 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-semibold">
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    {c.role} · <MapPin className="h-3 w-3" /> {c.location}
                  </div>
                </div>
                <Badge className="bg-gradient-primary">{c.match}% match</Badge>
                <Button variant="outline" size="sm" onClick={() => toast(`Viewing ${c.name}`, { description: `${c.role} · ${c.location}` })}>View</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card id="quick-post">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5 text-primary" /> Quick Post</CardTitle>
            <CardDescription>Publish an opportunity in seconds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Opportunity title" value={oppTitle} onChange={(e) => setOppTitle(e.target.value)} />
            <Input placeholder="Type (Job / Internship / Scholarship)" value={oppType} onChange={(e) => setOppType(e.target.value)} />
            <Textarea placeholder="Short description…" rows={4} value={oppDesc} onChange={(e) => setOppDesc(e.target.value)} />
            <Button onClick={publishOpportunity} className="w-full bg-gradient-primary hover:opacity-90">Publish</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}