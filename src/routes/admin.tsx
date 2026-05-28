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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Users, Activity, Trophy, Bot, Plus, Megaphone, Pencil, Trash2,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — EduVision AI" },
      { name: "description", content: "Platform-wide analytics, scholarships and AI usage management." },
    ],
  }),
  component: AdminDashboard,
});

const activityData = [
  { day: "Mon", active: 1240, ai: 820 },
  { day: "Tue", active: 1380, ai: 940 },
  { day: "Wed", active: 1520, ai: 1100 },
  { day: "Thu", active: 1410, ai: 990 },
  { day: "Fri", active: 1680, ai: 1240 },
  { day: "Sat", active: 1290, ai: 880 },
  { day: "Sun", active: 1100, ai: 760 },
];

const aiUsage = [
  { name: "Career Q&A", value: 42 },
  { name: "Roadmaps", value: 28 },
  { name: "Scholarships", value: 18 },
  { name: "Resources", value: 12 },
];
const COLORS = ["oklch(0.68 0.22 280)", "oklch(0.72 0.2 200)", "oklch(0.72 0.22 330)", "oklch(0.78 0.18 150)"];

const growth = [
  { m: "Jan", users: 1200 }, { m: "Feb", users: 1850 }, { m: "Mar", users: 2400 },
  { m: "Apr", users: 3100 }, { m: "May", users: 4200 }, { m: "Jun", users: 5400 },
  { m: "Jul", users: 6800 },
];

type Scholarship = { name: string; org: string; amount: string; applicants: number; status: "Open" | "Closed" };
const initialScholarships: Scholarship[] = [
  { name: "Vision 2030 STEM Grant", org: "Ministry of Education", amount: "$8,000", applicants: 421, status: "Open" },
  { name: "UNESCO SDG-4 Fellowship", org: "UNESCO", amount: "$12,000", applicants: 318, status: "Open" },
  { name: "Future Leaders Award", org: "Global Youth Forum", amount: "$5,500", applicants: 256, status: "Open" },
  { name: "Women in Tech Bursary", org: "Tech Foundation", amount: "$6,000", applicants: 198, status: "Closed" },
  { name: "Climate Action Scholarship", org: "Green Initiative", amount: "$4,500", applicants: 142, status: "Open" },
];

type Announcement = { title: string; date: string; audience: string };
const initialAnnouncements: Announcement[] = [
  { title: "Platform v2.4 launching", date: "2026-05-20", audience: "All users" },
  { title: "New scholarship batch open", date: "2026-05-18", audience: "Students" },
  { title: "Partner onboarding webinar", date: "2026-05-12", audience: "Organizations" },
];

function AdminDashboard() {
  const [scholarships, setScholarships] = useState<Scholarship[]>(initialScholarships);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [annTitle, setAnnTitle] = useState("");
  const [annBody, setAnnBody] = useState("");
  const [editing, setEditing] = useState<{ index: number; data: Scholarship } | null>(null);

  const openCount = scholarships.filter((s) => s.status === "Open").length;
  const totalApplicants = scholarships.reduce((sum, s) => sum + s.applicants, 0);

  const addScholarship = () => {
    const n = scholarships.length + 1;
    const fresh: Scholarship = {
      name: `New Opportunity Grant #${n}`,
      org: "EduVision Partners",
      amount: `$${(3 + n) * 1000}`,
      applicants: 0,
      status: "Open",
    };
    setScholarships((s) => [fresh, ...s]);
    toast.success("Scholarship added", { description: fresh.name });
  };

  const removeScholarship = (name: string) => {
    setScholarships((s) => s.filter((x) => x.name !== name));
    toast("Scholarship removed", { description: name });
  };

  const saveEdit = () => {
    if (!editing) return;
    setScholarships((list) => list.map((s, i) => (i === editing.index ? editing.data : s)));
    toast.success("Scholarship updated", { description: editing.data.name });
    setEditing(null);
  };

  const publishAnnouncement = () => {
    if (!annTitle.trim()) {
      toast.error("Please enter a title before publishing.");
      return;
    }
    const fresh: Announcement = {
      title: annTitle.trim(),
      date: new Date().toISOString().slice(0, 10),
      audience: "All users",
    };
    setAnnouncements((a) => [fresh, ...a]);
    setAnnTitle("");
    setAnnBody("");
    toast.success("Announcement published", { description: fresh.title });
  };

  return (
    <DashboardShell title="Admin Control Center" subtitle="Platform health, users and content management">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value="42,318" delta="+1,204 this week" icon={Users} />
        <StatCard label="Active students" value="18,742" delta="+8.4% MoM" icon={Activity} />
        <StatCard label="Scholarships" value={String(scholarships.length)} delta={`${openCount} open`} icon={Trophy} />
        <StatCard label="Total applicants" value={totalApplicants.toLocaleString()} delta="+12% vs avg" icon={Bot} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Active users & AI interactions this week</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="active" fill="oklch(0.68 0.22 280)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="ai" fill="oklch(0.72 0.2 200)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Usage Breakdown</CardTitle>
            <CardDescription>By interaction type</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={aiUsage} dataKey="value" innerRadius={50} outerRadius={85} paddingAngle={3}>
                  {aiUsage.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>Monthly trend</CardDescription>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="users" stroke="oklch(0.68 0.22 280)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Scholarship Management</CardTitle>
            <CardDescription>Review, edit and approve scholarship listings</CardDescription>
          </div>
          <Button onClick={addScholarship} className="bg-gradient-primary hover:opacity-90"><Plus className="h-4 w-4 mr-1" /> New scholarship</Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scholarships.map((s) => (
                  <TableRow key={s.name}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground">{s.org}</TableCell>
                    <TableCell className="font-semibold text-gradient">{s.amount}</TableCell>
                    <TableCell>{s.applicants}</TableCell>
                    <TableCell>
                      <Badge variant={s.status === "Open" ? "default" : "secondary"} className={s.status === "Open" ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15" : ""}>
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setEditing({ index: scholarships.indexOf(s), data: { ...s } })}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => removeScholarship(s.name)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Megaphone className="h-5 w-5 text-primary" /> New Announcement</CardTitle>
            <CardDescription>Broadcast updates across the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Title" value={annTitle} onChange={(e) => setAnnTitle(e.target.value)} />
            <Textarea placeholder="Write your announcement…" rows={4} value={annBody} onChange={(e) => setAnnBody(e.target.value)} />
            <div className="flex justify-end">
              <Button onClick={publishAnnouncement} className="bg-gradient-primary hover:opacity-90">Publish</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((a) => (
              <div key={a.title} className="flex items-center justify-between rounded-lg border p-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.date} · {a.audience}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => toast(`Editing "${a.title}"`, { description: "Demo: edit dialog would open here." })}><Pencil className="h-4 w-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit scholarship</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <Input value={editing.data.name} onChange={(e) => setEditing({ ...editing, data: { ...editing.data, name: e.target.value } })} placeholder="Name" />
              <Input value={editing.data.org} onChange={(e) => setEditing({ ...editing, data: { ...editing.data, org: e.target.value } })} placeholder="Organization" />
              <Input value={editing.data.amount} onChange={(e) => setEditing({ ...editing, data: { ...editing.data, amount: e.target.value } })} placeholder="Amount" />
              <div className="flex gap-2">
                <Button variant={editing.data.status === "Open" ? "default" : "outline"} size="sm" onClick={() => setEditing({ ...editing, data: { ...editing.data, status: "Open" } })}>Open</Button>
                <Button variant={editing.data.status === "Closed" ? "default" : "outline"} size="sm" onClick={() => setEditing({ ...editing, data: { ...editing.data, status: "Closed" } })}>Closed</Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={saveEdit} className="bg-gradient-primary">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  );
}