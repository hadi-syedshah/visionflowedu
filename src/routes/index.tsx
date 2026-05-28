import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  GraduationCap,
  Sparkles,
  Compass,
  BookOpenCheck,
  Trophy,
  Bot,
  Globe2,
  LineChart,
  Rocket,
  Target,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduVision AI — AI Career & Study Guidance | SDG 4 · Vision 2030/2035" },
      { name: "description", content: "EduVision AI helps students unlock their future with AI-powered career guidance, personalized study roadmaps and scholarship matches." },
      { property: "og:title", content: "EduVision AI" },
      { property: "og:description", content: "AI agent for quality education — aligned with SDG 4 and Vision 2030/2035." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Bot, title: "AI Career Coach", desc: "Conversational guidance powered by Gemini that adapts to your strengths and goals." },
  { icon: Compass, title: "Personalized Roadmaps", desc: "Step-by-step study plans built around your interests, skills and target career." },
  { icon: Trophy, title: "Scholarship Matching", desc: "Discover scholarships and grants matched to your profile across the globe." },
  { icon: LineChart, title: "Progress Analytics", desc: "Beautiful dashboards that track learning velocity, mastery and momentum." },
  { icon: Globe2, title: "SDG 4 Aligned", desc: "Built to advance inclusive, equitable and quality education for everyone." },
  { icon: Rocket, title: "Vision 2030/2035", desc: "Future-ready skills aligned with national transformation agendas." },
];

const testimonials = [
  { name: "Lina A.", role: "Engineering student", quote: "EduVision AI mapped a clear path from confused freshman to my first internship." },
  { name: "Yusuf M.", role: "High-school senior", quote: "It found 4 scholarships I'd never heard of. I'm starting university next fall." },
  { name: "Dr. Hana", role: "University advisor", quote: "The clearest, kindest career assistant I've shown to my students." },
];

const faqs = [
  { q: "Is EduVision AI free for students?", a: "Yes. Core guidance, roadmaps and scholarship matching are free for every student." },
  { q: "How is my data used?", a: "Your interests and progress are used only to personalize your guidance. You stay in control." },
  { q: "Which subjects are supported?", a: "STEM, humanities, business, design, healthcare and more — the AI adapts to any field." },
  { q: "Can institutions use it?", a: "Yes. Our Client dashboard lets organizations post opportunities and analyze talent fit." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 glass border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold">EduVision AI</div>
              <div className="text-[10px] text-muted-foreground">SDG 4 · Vision 2030/35</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 ml-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#sdg" className="hover:text-foreground">SDG 4</a>
            <a href="#vision" className="hover:text-foreground">Vision 2030/35</a>
            <a href="#testimonials" className="hover:text-foreground">Testimonials</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/admin">Admin</Link>
            </Button>
            <Button asChild className="bg-gradient-primary hover:opacity-90 shadow-glow">
              <Link to="/student">
                Launch App <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI Agent for Quality Education
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Your future, <span className="text-gradient">designed by AI.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
            EduVision AI guides students with personalized career advice, study roadmaps and
            scholarship matches — aligned with SDG 4 and Vision 2030/2035.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow">
              <Link to="/student">Start as Student <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/client">For Organizations</Link>
            </Button>
          </div>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              ["120k+", "Students guided"],
              ["3.2k+", "Scholarships matched"],
              ["48", "Partner countries"],
              ["96%", "Satisfaction"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl border bg-card/60 backdrop-blur p-4">
                <div className="text-2xl md:text-3xl font-bold text-gradient">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-4 md:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Features</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Everything a modern learner needs</h2>
          <p className="mt-3 text-muted-foreground">Built end-to-end around the student journey, from discovery to opportunity.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Card key={f.title} className="group hover:shadow-glow transition-shadow border-border/60">
              <CardContent className="p-6">
                <div className="h-11 w-11 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SDG 4 */}
      <section id="sdg" className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">SDG 4 — Quality Education</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Inclusive, equitable, lifelong learning for all</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The UN Sustainable Development Goal 4 calls for ensuring inclusive and quality education
              that promotes lifelong learning opportunities for everyone. EduVision AI advances this
              goal by removing barriers to personalized guidance — making expert-level mentorship
              available to every learner, anywhere.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "Free, equitable access to AI guidance",
                "Scholarship discovery for underrepresented students",
                "Career pathways aligned to future-of-work skills",
                "Inclusive of all subjects, languages and levels",
              ].map((t) => (
                <li key={t} className="flex gap-2"><BookOpenCheck className="h-4 w-4 text-primary mt-0.5" />{t}</li>
              ))}
            </ul>
          </div>
          <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
            <CardContent className="p-8">
              <Target className="h-10 w-10 opacity-90" />
              <h3 className="mt-4 text-2xl font-bold">How AI helps education</h3>
              <p className="mt-2 text-sm opacity-90 leading-relaxed">
                AI personalizes pace, identifies skill gaps, surfaces hidden opportunities and
                gives every student a 24/7 mentor — at the scale a teacher alone cannot reach.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[["10x", "faster guidance"], ["24/7", "availability"], ["100%", "personalized"]].map(([v, l]) => (
                  <div key={l} className="rounded-lg bg-white/10 p-3">
                    <div className="text-xl font-bold">{v}</div>
                    <div className="text-[10px] opacity-80 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="mx-auto max-w-7xl px-4 md:px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Aligned with the future</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Vision 2030 & Vision 2035</h2>
          <p className="mt-3 text-muted-foreground">
            National transformation plans demand a generation that is digitally fluent, globally
            competitive and purpose-driven. EduVision AI prepares students for exactly that.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-border/60">
            <div className="h-1.5 bg-gradient-primary" />
            <CardContent className="p-8">
              <h3 className="text-xl font-bold flex items-center gap-2"><Rocket className="h-5 w-5 text-primary" /> Vision 2030 Impact</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Empowering a knowledge-based economy by equipping students with the skills,
                certifications and entrepreneurial mindset required by tomorrow's industries.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-border/60">
            <div className="h-1.5 bg-gradient-accent" />
            <CardContent className="p-8">
              <h3 className="text-xl font-bold flex items-center gap-2"><Globe2 className="h-5 w-5 text-accent" /> Vision 2035 Alignment</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Building lifelong learners ready for an AI-augmented economy, with sustainability,
                innovation and inclusivity at the core of every career path.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Loved by learners</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">Testimonials</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border/60">
                <CardContent className="p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground text-sm font-semibold">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 md:px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 pb-20">
        <Card className="overflow-hidden border-0 shadow-glow">
          <div className="bg-gradient-primary p-10 md:p-16 text-center text-primary-foreground">
            <Users className="h-10 w-10 mx-auto opacity-90" />
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">Join the next generation of learners</h2>
            <p className="mt-3 max-w-xl mx-auto opacity-90">
              Personalized AI guidance, real opportunities, real impact — all in one place.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/student">Get Started Free</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/client">For Organizations</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center">
                <GraduationCap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">EduVision AI</span>
            </div>
            <p className="mt-3 text-muted-foreground">AI for quality education, aligned with SDG 4 and Vision 2030/2035.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Product</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/student" className="hover:text-foreground">Student</Link></li>
              <li><Link to="/client" className="hover:text-foreground">Organizations</Link></li>
              <li><Link to="/admin" className="hover:text-foreground">Admin</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Mission</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#sdg" className="hover:text-foreground">SDG 4</a></li>
              <li><a href="#vision" className="hover:text-foreground">Vision 2030/35</a></li>
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
              <li><a href="#testimonials" className="hover:text-foreground">Testimonials</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} EduVision AI. Built for a better tomorrow.
        </div>
      </footer>
    </div>
  );
}
