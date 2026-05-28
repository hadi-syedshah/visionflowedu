import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Home,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const sections = [
  {
    label: "Overview",
    items: [{ title: "Landing", url: "/", icon: Home }],
  },
  {
    label: "Dashboards",
    items: [
      { title: "Student", url: "/student", icon: LayoutDashboard },
      { title: "Admin", url: "/admin", icon: ShieldCheck },
      { title: "Client / Org", url: "/client", icon: Building2 },
    ],
  },
];

export function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <Link to="/" className="flex items-center gap-2 px-2 py-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-bold">EduVision AI</span>
                <span className="text-[10px] text-muted-foreground">SDG 4 · Vision 2030/35</span>
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            {sections.map((s) => (
              <SidebarGroup key={s.label}>
                <SidebarGroupLabel>{s.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {s.items.map((item) => {
                      const active = path === item.url;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={active}>
                            <Link to={item.url} className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <div className="rounded-lg border bg-gradient-primary/10 p-3 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> AI Insights
              </div>
              <p className="mt-1">Powered by Gemini · live recommendations</p>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center gap-3 border-b px-4 md:px-6 sticky top-0 z-30 glass">
            <SidebarTrigger />
            <div className="flex-1 min-w-0">
              <h1 className="text-base md:text-lg font-semibold truncate">{title}</h1>
              {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}