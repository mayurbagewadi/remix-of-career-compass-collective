import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Compass, Globe2, GraduationCap, Plane, Brain, Users, Award,
  Facebook, Instagram, Linkedin, Menu, X, ArrowRight, CheckCircle2,
  Scale, Briefcase, Palette, Stethoscope, Cog, MessageCircle, Sparkles,
  Phone, Mail, MapPin, BookOpen, Wallet, Trophy, Landmark, BadgeCheck,
  FileText, Lightbulb, ClipboardCheck, Quote, Star, ChevronLeft, ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import counselorImg from "@/assets/counselor.png";
import futureReadyImg from "@/assets/future-ready.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Career Craft Youth — Your Compass to a Successful Future" },
      { name: "description", content: "Expert psychometric analysis and strategic admission guidance for students and Global Indians (OCI/NRI). Book your discovery call today." },
      { property: "og:title", content: "Career Craft Youth — Your Compass to a Successful Future" },
      { property: "og:description", content: "Personalized career counseling, study-abroad roadmaps, and admission strategy from a national award–recognized team." },
    ],
  }),
  component: Index,
});

const FB = "https://www.facebook.com/profile.php?id=61576293282096";
const IG = "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=zkjqm3r";
const LI = "https://www.linkedin.com/in/rupali-rathore";

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Services", href: "#services" },
    { label: "Discovery Tests", href: "#discovery" },
    { label: "Scholarships", href: "#scholarships" },
    { label: "Internships", href: "#internships" },
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <>
      <div className="bg-primary text-white/95 text-[11px] md:text-xs font-medium tracking-wide text-center py-1.5 border-b border-white/10">
        <div className="inline-flex items-center gap-1.5">
          <Landmark className="w-3.5 h-3.5 text-gold" />
          <span>Government of India Registered MSME</span>
          <span className="mx-1 text-white/40">|</span>
          <BadgeCheck className="w-3.5 h-3.5 text-gold" />
          <span>Trusted by Parents | Driven by Science</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-18 flex items-center justify-between py-4">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid place-items-center w-10 h-10 rounded-lg bg-hero-gradient shadow-elegant">
            <Compass className="w-5 h-5 text-gold" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-primary">
            Career Craft <span className="text-gradient-gold">Youth</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 text-primary/70">
            <a href={FB} aria-label="Facebook" className="hover:text-primary transition"><Facebook className="w-4 h-4" /></a>
            <a href={IG} aria-label="Instagram" className="hover:text-primary transition"><Instagram className="w-4 h-4" /></a>
            <a href={LI} aria-label="LinkedIn" className="hover:text-primary transition"><Linkedin className="w-4 h-4" /></a>
          </div>
          <a href="#contact" className="inline-flex items-center gap-1.5 bg-gold-gradient text-gold-foreground px-5 py-2.5 rounded-md text-sm font-semibold shadow-gold hover:opacity-95 transition">
            Book Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-primary" aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-white px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-medium">{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block bg-gold-gradient text-gold-foreground px-4 py-2 rounded-md text-sm font-semibold text-center">Book Now</a>
        </div>
      )}
    </header>
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white">
      <div className="absolute inset-0 opacity-30">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-deep via-primary/80 to-primary/40" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white/90 backdrop-blur-sm">
            <Award className="w-3.5 h-3.5 text-gold" />
            Trusted by Parents | Driven by Science
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05]">
            Your Compass to a <span className="text-gradient-gold italic">Successful</span> Future.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            Expert Psychometric Analysis and Strategic Admission Guidance for Students & Global Indians (OCI / NRI).
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground px-7 py-4 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition-transform">
              Schedule My Discovery Call <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="inline-flex items-center gap-2 px-7 py-4 rounded-md font-semibold border border-white/25 text-white hover:bg-white/10 transition">
              Explore Services
            </a>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> 1:1 Personalized Mentorship</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Industry Veteran Panel</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> Global Indian Desk</div>
          </div>
        </div>
        <div className="hidden md:block md:col-span-5">
          <div className="relative aspect-square rounded-2xl bg-white/5 border border-white/15 backdrop-blur-sm p-8 shadow-elegant">
            <Compass className="w-full h-full text-gold/80" strokeWidth={0.8} />
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: Globe2,
    title: "The Global Indian Desk",
    badge: "Signature",
    desc: "Specialized OCI / PIO / NRI / CIWG India admission counselling — navigating structural quotas and seamless transitions.",
  },
  {
    icon: GraduationCap,
    title: "Professional Streams",
    desc: "Engineering, Medical, BBA/MBA, Law and Design — entrance strategy, profile-building and stream selection.",
  },
  {
    icon: Plane,
    title: "Global Education",
    desc: "Dedicated Study Abroad roadmap — Ivy / Tier-1 admission tactics, SOPs, and university shortlisting.",
  },
];

function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Services</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-primary">Specialized counsel, targeted outcomes.</h2>
          <p className="mt-4 text-muted-foreground text-lg">Three high-impact pillars built around the realities of modern admissions — for Indian and global Indian families alike.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group relative bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary text-white">
                  <s.icon className="w-6 h-6 text-gold" />
                </div>
                {s.badge && (
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-gold-gradient text-gold-foreground">{s.badge}</span>
                )}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-primary">{s.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-gold-deep transition">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-4 gap-4">
          {[
            { icon: Cog, label: "Engineering" },
            { icon: Stethoscope, label: "Medical" },
            { icon: Briefcase, label: "BBA / MBA" },
            { icon: Scale, label: "Law" },
            { icon: Palette, label: "Design" },
            { icon: Plane, label: "Study Abroad" },
            { icon: Globe2, label: "OCI / NRI" },
            { icon: Brain, label: "Psychometrics" },
          ].map(p => (
            <div key={p.label} className="flex items-center gap-3 bg-white border border-border rounded-lg px-4 py-3">
              <p.icon className="w-4 h-4 text-gold-deep" />
              <span className="text-sm font-medium text-foreground/85">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Discovery() {
  return (
    <section id="discovery" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Discovery Tests</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-primary leading-tight">
            8th–12th Grade <span className="italic text-gradient-gold">Stream Discovery</span>.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            A scientifically-validated psychometric analysis that maps aptitude, personality and interest to the right academic stream — long before the pressure of decisions hits.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "60-minute deep psychometric battery",
              "30-page personalized career report",
              "1:1 debrief session with lead counselor",
              "Stream-fit, college-fit and career-fit mapping",
            ].map(t => (
              <li key={t} className="flex items-start gap-3 text-foreground/85">
                <CheckCircle2 className="w-5 h-5 text-gold-deep mt-0.5 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary-deep transition">
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
            <span className="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-dashed border-gold text-gold-deep text-sm font-medium">
              <Sparkles className="w-4 h-4" /> Early-bird pricing &amp; offers — ask us
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-gold-gradient opacity-20 blur-3xl rounded-full" />
          <div className="relative bg-hero-gradient rounded-3xl p-10 text-white shadow-elegant">
            <Brain className="w-12 h-12 text-gold" />
            <div className="mt-6 text-sm uppercase tracking-wider text-white/60">Psychometric Analysis</div>
            <div className="mt-2 text-3xl font-display font-semibold">Clarity, not guesswork.</div>
            <div className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t border-white/15">
              <div><div className="text-3xl font-semibold text-gold">12+</div><div className="text-xs text-white/70 mt-1">Aptitude domains</div></div>
              <div><div className="text-3xl font-semibold text-gold">30pg</div><div className="text-xs text-white/70 mt-1">Report</div></div>
              <div><div className="text-3xl font-semibold text-gold">1:1</div><div className="text-xs text-white/70 mt-1">Debrief</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-white shadow-elegant">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
            <img
              src={futureReadyImg}
              alt="Career Craft Youth Future Ready Students Community infographic"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="relative p-10 md:p-12 text-center">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gold-gradient opacity-20 blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium">
                <Users className="w-3.5 h-3.5 text-gold" /> Free Community
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-display font-semibold">Join the Inner Circle.</h2>
              <p className="mt-4 text-white/80 leading-relaxed">
                Real-time admission alerts, internships, new-age courses and expert tips — free, always.
              </p>
              <a href="#contact" className="mt-8 inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition-transform">
                <MessageCircle className="w-5 h-5" /> Join on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Scholarships() {
  const highlights = [
    { icon: Wallet, title: "Central & State Schemes", desc: "Pre-matric, post-matric, merit-cum-means and minority scholarships — all in one verified portal." },
    { icon: Trophy, title: "Merit & Need Based", desc: "From top-rankers to first-generation learners — funding pathways for every profile and every stream." },
    { icon: BookOpen, title: "Apply with Confidence", desc: "We help you decode eligibility, deadlines and documentation so no deserving student is left behind." },
  ];
  return (
    <section id="scholarships" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Scholarships for All</div>
            <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-primary leading-tight">
              Funding the <span className="italic text-gradient-gold">dreams</span> of every learner.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Talent should never be limited by tuition. Explore India’s National Scholarship Portal — a single gateway to hundreds of central & state government scholarships for school, college and professional courses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://scholarships.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition-transform"
              >
                Explore Scholarships <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-semibold border border-primary/20 text-primary hover:bg-secondary transition">
                Get Guidance
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Opens scholarships.gov.in — Government of India National Scholarship Portal.</p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-1 gap-5">
            {highlights.map(h => (
              <div key={h.title} className="flex items-start gap-5 bg-card border border-border rounded-2xl p-6 md:p-7 shadow-card hover:shadow-elegant transition-shadow">
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary shrink-0">
                  <h.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">{h.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Internships() {
  const cards = [
    {
      icon: FileText,
      title: "Research Paper Guidance",
      desc: "End-to-end mentorship for publishing in reputed journals — topic selection, methodology, drafting, and peer-review navigation.",
    },
    {
      icon: Lightbulb,
      title: "Internship Placements",
      desc: "Curated internship opportunities across STEM, management, and design — with resume reviews and interview prep.",
    },
    {
      icon: ClipboardCheck,
      title: "Project & Portfolio Building",
      desc: "Structured support for capstone projects, startup pitches, and standout college application portfolios.",
    },
    {
      icon: Award,
      title: "Competition & Grant Prep",
      desc: "Guidance for science fairs, hackathons, innovation challenges, and research grants that boost admission profiles.",
    },
  ];
  return (
    <section id="internships" className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Internships & Research</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-primary leading-tight">
            Build proof, not just <span className="italic text-gradient-gold">potential</span>.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stand out in admissions with real-world experience. We help students secure internships, publish research, and craft portfolios that colleges actually notice.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="group flex items-start gap-5 bg-card border border-border rounded-2xl p-7 shadow-card hover:shadow-elegant transition-shadow">
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary shrink-0">
                <c.icon className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">{c.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <a href="#contact" className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition-transform">
            Get Started <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-semibold border border-primary/20 text-primary hover:bg-secondary transition">
            Ask About Opportunities
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  const experts = [
    {
      icon: Globe2,
      title: "The Global Indian Desk Specialist",
      focus: "OCI / PIO / NRI / CIWG admissions, structural quotas, and seamless transitions to Indian universities.",
    },
    {
      icon: Plane,
      title: "STEM & Global Education Strategists",
      focus: "Engineering, Medical and Study Abroad roadmap planning, profile-building, and Ivy / Tier-1 admission tactics.",
    },
    {
      icon: Briefcase,
      title: "Commerce, Law & Management Mentors",
      focus: "BBA/MBA, Law and Design portfolio development, entrance exam strategies, and interview coaching.",
    },
  ];
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">About</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-primary leading-tight">Meet your lead counselor &amp; expert team.</h2>
          <p className="mt-4 text-lg text-muted-foreground">A personalized roadmap, driven by domain specialists.</p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-10">
          <div className="bg-surface border border-border rounded-3xl p-8 md:p-10 shadow-card">
            <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-accent via-surface to-secondary">
              <div className="absolute inset-0 bg-gold-gradient opacity-10" />
              <img src={counselorImg} alt="Rupali Rathore, Lead Career Counselor" className="relative w-full h-full object-contain object-bottom" loading="lazy" />
            </div>
            <div className="mt-7">
              <h3 className="text-2xl font-display font-semibold text-primary">Rupali Rathore</h3>
              <div className="text-sm font-medium text-gold-deep mt-1">Lead Career Counselor &amp; Founder</div>
              <blockquote className="mt-6 text-foreground/85 leading-relaxed border-l-2 border-gold pl-5 italic">
                “Every student deserves more than just a template for their future — they deserve a personalized compass. My mission is to deeply understand your unique strengths, reduce the overwhelming anxiety of admissions, and match you with the precise industry veterans who can unlock your dream career. We don’t just look at grades; we craft trajectories with empathy, clarity, and measurable results.”
              </blockquote>
            </div>
          </div>

          <div className="space-y-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">The Expert Panel</div>
            {experts.map(e => (
              <div key={e.title} className="bg-card border border-border rounded-2xl p-7 shadow-card hover:shadow-elegant transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="grid place-items-center w-11 h-11 rounded-lg bg-primary shrink-0">
                    <e.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-primary">{e.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed"><span className="font-medium text-foreground/80">Focus:</span> {e.focus}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-gold/30 bg-gradient-to-br from-accent to-surface p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-gold-deep">Why Career Craft Youth?</div>
            <p className="mt-2 text-lg text-primary max-w-2xl">
              By blending modern psychometric analysis with the collective wisdom of seasoned academic and corporate mentors, we ensure our students get a massive competitive edge.
            </p>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold whitespace-nowrap hover:scale-[1.02] transition-transform">
            Schedule My Discovery Call <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "Career Craft Youth completely transformed how we approached our daughter's college applications. The psychometric test revealed strengths we never knew she had, and the admission strategy was spot-on.",
      name: "Ananya Sharma",
      role: "Parent of Grade 12 Student",
      rating: 5,
    },
    {
      quote: "I was confused between engineering and design. The stream discovery session gave me crystal-clear clarity. Today I'm studying at my dream design school — all thanks to Rupali ma'am.",
      name: "Rohan Mehta",
      role: "Student, Class 11",
      rating: 5,
    },
    {
      quote: "As an NRI parent, finding trustworthy guidance for Indian university admissions was stressful. The Global Indian Desk made the entire process seamless and transparent.",
      name: "Priya Nair",
      role: "Parent of OCI Student",
      rating: 5,
    },
    {
      quote: "The internship placement support helped me land a research role at a top lab. My college application stood out because I had real published work — not just grades.",
      name: "Aditya Kapoor",
      role: "Student, Class 12",
      rating: 5,
    },
    {
      quote: "What impressed me most was the personalized attention. They didn't just hand us a list of colleges — they built a complete roadmap tailored to my son's personality and goals.",
      name: "Vikram Reddy",
      role: "Parent of Grade 10 Student",
      rating: 5,
    },
    {
      quote: "The scholarship guidance alone saved us lakhs in tuition. They walked us through every form, every deadline, and every eligibility check. Truly life-changing support.",
      name: "Sunita Patel",
      role: "Parent of Grade 11 Student",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Testimonials</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-semibold text-primary leading-tight">
            Voices of <span className="italic text-gradient-gold">trust</span> &amp; transformation.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real stories from parents and students whose futures we helped shape — one decision at a time.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, r) => (
                  <Star key={r} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-gold/40 mb-4" />
              <p className="text-foreground/85 leading-relaxed flex-1">{t.quote}</p>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="font-semibold text-primary">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contact" className="py-24 md:py-32 bg-hero-gradient text-white relative overflow-hidden">
      <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-gold-gradient opacity-10 blur-3xl rounded-full" />
      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-14">
        <div>
          <div className="text-sm font-semibold text-gold uppercase tracking-wider">Get in Touch</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-semibold leading-tight">Let’s craft your trajectory.</h2>
          <p className="mt-5 text-white/80 text-lg max-w-md">Share a few details and our team will reach out within 24 hours to schedule your discovery call.</p>
          <div className="mt-10 space-y-4 text-white/80">
            <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold" /><span>+91 — Available on request</span></div>
            <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-gold" /><span>career.craftyouth@gmail.com</span></div>
            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gold" /><span>India · Serving Global Indians worldwide</span></div>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <a href={FB} aria-label="Facebook" className="w-10 h-10 grid place-items-center rounded-full border border-white/20 hover:bg-white/10 transition"><Facebook className="w-4 h-4" /></a>
            <a href={IG} aria-label="Instagram" className="w-10 h-10 grid place-items-center rounded-full border border-white/20 hover:bg-white/10 transition"><Instagram className="w-4 h-4" /></a>
            <a href={LI} aria-label="LinkedIn" className="w-10 h-10 grid place-items-center rounded-full border border-white/20 hover:bg-white/10 transition"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="bg-white text-foreground rounded-2xl p-8 md:p-10 shadow-elegant"
        >
          {submitted ? (
            <div className="text-center py-10">
              <CheckCircle2 className="w-12 h-12 text-gold-deep mx-auto" />
              <h3 className="mt-4 text-2xl font-display font-semibold text-primary">Thank you!</h3>
              <p className="mt-2 text-muted-foreground">We’ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-display font-semibold text-primary">Book your discovery call</h3>
              <div className="mt-6 space-y-4">
                <Field label="Full Name" name="name" placeholder="Your name" required />
                <Field label="Phone" name="phone" type="tel" placeholder="+91 98xxxxxxxx" required />
                <div>
                  <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Grade / Interest</label>
                  <select required className="mt-1.5 w-full px-4 py-3 rounded-md border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="">Select</option>
                    <option>Grade 8–10 (Stream Discovery)</option>
                    <option>Grade 11–12 (Admissions)</option>
                    <option>Study Abroad</option>
                    <option>OCI / NRI Admissions</option>
                    <option>BBA / MBA / Law / Design</option>
                    <option>Internship / Research Paper Support</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Message</label>
                  <textarea rows={4} placeholder="Tell us a little about your goals…" className="mt-1.5 w-full px-4 py-3 rounded-md border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.01] transition-transform">
                  Schedule My Discovery Call <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required}
        className="mt-1.5 w-full px-4 py-3 rounded-md border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-primary-deep text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-10 h-10 rounded-lg bg-white/10">
              <Compass className="w-5 h-5 text-gold" />
            </span>
            <span className="font-display text-lg font-semibold text-white">Career Craft <span className="text-gradient-gold">Youth</span></span>
          </div>
          <p className="mt-5 max-w-md text-sm text-white/65 leading-relaxed">
            Your compass to a successful future — personalized career counseling, admissions strategy, and a global Indian desk under one roof.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href={FB} aria-label="Facebook" className="w-9 h-9 grid place-items-center rounded-full border border-white/15 hover:bg-white/10 transition"><Facebook className="w-4 h-4" /></a>
            <a href={IG} aria-label="Instagram" className="w-9 h-9 grid place-items-center rounded-full border border-white/15 hover:bg-white/10 transition"><Instagram className="w-4 h-4" /></a>
            <a href={LI} aria-label="LinkedIn" className="w-9 h-9 grid place-items-center rounded-full border border-white/15 hover:bg-white/10 transition"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-white font-semibold">Quick Links</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#services" className="hover:text-gold">Services</a></li>
            <li><a href="#discovery" className="hover:text-gold">Discovery Tests</a></li>
            <li><a href="#scholarships" className="hover:text-gold">Scholarships</a></li>
            <li><a href="#internships" className="hover:text-gold">Internships</a></li>
            <li><a href="#about" className="hover:text-gold">About</a></li>
            <li><a href="#testimonials" className="hover:text-gold">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-gold">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-white font-semibold">Services</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Global Indian Desk</li>
            <li>Study Abroad</li>
            <li>Psychometric Analysis</li>
            <li>Admissions Strategy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/55 flex flex-col md:flex-row gap-2 md:justify-between">
          <div>© {new Date().getFullYear()} Career Craft Youth. All rights reserved.</div>
          <div>Crafted with empathy, clarity &amp; measurable results.</div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Discovery />
      <Community />
      <Scholarships />
      <Internships />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
