import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  Compass, Globe2, GraduationCap, Plane, Brain, Users, Award,
  Facebook, Instagram, Linkedin, Menu, X, ArrowRight, CheckCircle2,
  Scale, Briefcase, Palette, Stethoscope, Cog, Sparkles,
  Phone, Mail, MapPin, BookOpen, Wallet, Trophy, Landmark, BadgeCheck,
  FileText, Lightbulb, ClipboardCheck, Quote, Star, ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import futureReadyImg from "@/assets/future-ready.jpg";
import whatsappIcon from "@/assets/whatsapp.png";
import type { LandingPhoto } from "@/lib/landing-photos";
import { getSupabaseClient } from "@/lib/supabase";
import type { Testimonial } from "@/lib/testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Career Craft Youth — Your Compass to a Successful Future" },
      { name: "description", content: "Expert psychometric analysis and strategic admission guidance for students and Global Indians (OCI/NRI). Book your discovery call today." },
      { property: "og:title", content: "Career Craft Youth — Your Compass to a Successful Future" },
      { property: "og:description", content: "Personalized career counseling, study-abroad roadmaps, and admission strategy from a national award–recognized team." },
    ],
    scripts: [
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-2J84HVW2Z4",
      },
      {
        children:
          "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-2J84HVW2Z4');",
      },
    ],
  }),
  component: Index,
});

type SocialLinks = {
  facebook: string;
  instagram: string;
  linkedin: string;
};

const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  facebook: "https://www.facebook.com/profile.php?id=61576293282096",
  instagram: "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=zkjqm3r",
  linkedin: "https://www.linkedin.com/in/rupali-rathore",
};
const sectionIds = [
  "hero",
  "services",
  "discovery",
  "community",
  "scholarships",
  "internships",
  "about",
  "photos",
  "testimonials",
  "faq",
  "contact",
] as const;

function Header({ activeSection, socialLinks }: { activeSection: string; socialLinks: SocialLinks }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Services", href: "#services" },
    { label: "Discovery Tests", href: "#discovery" },
    { label: "FAQ", href: "#faq" },
    { label: "Scholarships", href: "#scholarships" },
    { label: "Internships", href: "#internships" },
    { label: "About", href: "#about" },
    { label: "Photos", href: "#photos" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <>
      <div className="bg-primary text-white/95 text-[11px] md:text-xs font-medium tracking-wide text-center px-3 py-1.5 border-b border-white/10">
        <div className="inline-flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          <Landmark className="w-3.5 h-3.5 text-gold" />
          <span>Government of India Registered MSME</span>
          <span className="hidden sm:inline mx-1 text-white/40">|</span>
          <BadgeCheck className="w-3.5 h-3.5 text-gold" />
          <span>Trusted by Parents | Driven by Science</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-18 md:h-[5rem] flex items-center justify-between py-3 md:py-4">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid place-items-center w-12 h-12 md:w-12 md:h-12 rounded-lg bg-hero-gradient shadow-elegant">
            <Compass className="w-6 h-6 md:w-6 md:h-6 text-gold" />
          </span>
          <span className="font-display text-lg sm:text-xl md:text-xl font-semibold tracking-tight text-primary">
            Career Craft <span className="text-gradient-gold">Youth</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 text-xs lg:text-sm font-medium text-foreground/80">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              aria-current={l.href.startsWith("#") && activeSection === l.href.slice(1) ? "page" : undefined}
              className={`relative pb-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-gold after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100 ${
                l.href.startsWith("#") && activeSection === l.href.slice(1)
                  ? "text-primary after:scale-x-100"
                  : "after:scale-x-0"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex shrink-0 items-center gap-6 pl-2">
          <a href="#contact" className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap bg-gold-gradient text-gold-foreground px-5 py-2.5 rounded-md text-sm font-semibold shadow-gold hover:opacity-95 transition">
            Book Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden min-w-12 min-h-12 grid place-items-center text-primary" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu-panel md:hidden border-t border-border bg-white px-4 py-4 space-y-3 shadow-card">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={l.href.startsWith("#") && activeSection === l.href.slice(1) ? "page" : undefined}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
                l.href.startsWith("#") && activeSection === l.href.slice(1)
                  ? "bg-accent text-primary border-l-4 border-gold pl-2"
                  : "text-foreground/80 hover:bg-secondary hover:text-primary"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block bg-gold-gradient text-gold-foreground px-4 py-3 rounded-md text-sm font-semibold text-center">Book Now</a>
        </div>
      )}
    </header>
    </>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-hero-gradient text-white">
      <div className="absolute inset-0 opacity-30">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-deep via-primary/80 to-primary/40" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 md:py-32 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white/90 backdrop-blur-sm">
            <Award className="w-3.5 h-3.5 text-gold" />
            Trusted by Parents | Driven by Science
          </div>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08]">
            Your Compass to a <span className="inline-block px-1 text-gold tracking-normal">Successful</span> Future.
          </h1>
          <p className="mt-5 md:mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            Expert Psychometric Analysis and Strategic Admission Guidance for Students & Global Indians (OCI / NRI).
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <a href="#contact" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gold-gradient text-gold-foreground px-6 sm:px-7 py-3.5 sm:py-4 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition-transform">
              Schedule My Discovery Call <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#services" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-md font-semibold border border-white/25 text-white hover:bg-white/10 transition">
              Explore Services
            </a>
          </div>
          <div className="mt-9 md:mt-12 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-8 gap-y-3 text-sm text-white/70">
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

function Services({ isVisible }: { isVisible: boolean }) {
  return (
    <section id="services" className={`section-pop ${isVisible ? "is-visible" : ""} py-16 sm:py-20 md:py-32 bg-surface`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Services</div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary">Specialized counsel, targeted outcomes.</h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">Three high-impact pillars built around the realities of modern admissions — for Indian and global Indian families alike.</p>
        </div>
        <div className="mt-10 md:mt-14 grid md:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => (
            <div key={s.title} className={`card-reveal group relative bg-card border border-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 ${i === 1 ? "delay-100" : i === 2 ? "delay-200" : ""}`}>
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

        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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
            <div key={p.label} className="flex items-center gap-3 bg-white border border-border rounded-lg px-4 py-3 min-h-12">
              <p.icon className="w-4 h-4 text-gold-deep" />
              <span className="text-sm font-medium text-foreground/85">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Discovery({ isVisible }: { isVisible: boolean }) {
  return (
    <section id="discovery" className={`section-pop ${isVisible ? "is-visible" : ""} py-16 sm:py-20 md:py-32 bg-background`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
        <div>
          <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Discovery Tests</div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-tight">
            8th–12th Grade <span className="italic text-gradient-gold">Stream Discovery</span>.
          </h2>
          <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
            A scientifically-validated psychometric analysis that maps aptitude, personality and interest to the right academic stream — long before the pressure of decisions hits.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "60-minute deep psychometric analysis",
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
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary-deep transition">
              Learn More <ArrowRight className="w-4 h-4" />
            </a>
            <span className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-dashed border-gold text-gold-deep text-sm font-medium">
              <Sparkles className="w-4 h-4" /> Early-bird pricing &amp; offers — ask us
            </span>
          </div>
        </div>
        <div className="card-reveal delay-150 relative">
          <div className="absolute -inset-6 bg-gold-gradient opacity-20 blur-3xl rounded-full" />
          <div className="relative bg-hero-gradient rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-elegant">
            <Brain className="w-12 h-12 text-gold" />
            <div className="mt-6 text-sm uppercase tracking-wider text-white/60">Psychometric Analysis</div>
            <div className="mt-2 text-2xl sm:text-3xl font-display font-semibold">Clarity, not guesswork.</div>
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 pt-8 border-t border-white/15">
              <div><div className="text-2xl sm:text-3xl font-semibold text-gold">12+</div><div className="text-xs text-white/70 mt-1">Aptitude domains</div></div>
              <div><div className="text-2xl sm:text-3xl font-semibold text-gold">30pg</div><div className="text-xs text-white/70 mt-1">Report</div></div>
              <div><div className="text-2xl sm:text-3xl font-semibold text-gold">1:1</div><div className="text-xs text-white/70 mt-1">Debrief</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Community({ isVisible }: { isVisible: boolean }) {
  return (
    <section id="community" className={`section-pop ${isVisible ? "is-visible" : ""} py-16 sm:py-20 md:py-24 bg-surface`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="card-reveal relative overflow-hidden rounded-2xl md:rounded-3xl bg-primary text-white shadow-elegant">
          <div className="relative w-full bg-white p-2 sm:p-3 outline outline-4 outline-red-500">
            <img
              src={futureReadyImg}
              alt="Career Craft Youth Future Ready Students Community infographic"
              className="w-full h-auto rounded-xl outline outline-4 outline-blue-500"
              loading="lazy"
              onLoad={(event) => {
                const img = event.currentTarget;
                console.log("[COMMUNITY_IMAGE_DEBUG]", {
                  src: img.currentSrc,
                  naturalWidth: img.naturalWidth,
                  naturalHeight: img.naturalHeight,
                  renderedWidth: img.clientWidth,
                  renderedHeight: img.clientHeight,
                  objectFit: getComputedStyle(img).objectFit,
                  parentWidth: img.parentElement?.clientWidth,
                  parentHeight: img.parentElement?.clientHeight,
                  parentOverflow: img.parentElement ? getComputedStyle(img.parentElement).overflow : null,
                });
              }}
              onError={() => {
                console.error("[COMMUNITY_IMAGE_DEBUG] Failed to load future-ready image", futureReadyImg);
              }}
            />
          </div>
          <div className="relative p-6 sm:p-8 md:p-12 text-center">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gold-gradient opacity-20 blur-3xl" />
            <div className="relative max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium">
                <Users className="w-3.5 h-3.5 text-gold" /> Free Community
              </div>
              <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-display font-semibold">Join the WhatsApp Inner Circle.</h2>
              <p className="mt-4 text-white/80 leading-relaxed">
                Real-time admission alerts, internships, new-age courses and expert tips — free, always.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3">
                <a
                  href="https://chat.whatsapp.com/EU3ISjqXNiTL7Oy5agzVK6?s=cl&p=a&ilr=1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition-transform"
                >
                  <img src={whatsappIcon} alt="" className="h-[26px] w-[26px]" /> OCI/NRI/CIWGC Group
                </a>
                <a
                  href="https://chat.whatsapp.com/KucZY4GkO0sJsqLdu0PspM?s=cl&p=a&ilr=1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3.5 font-semibold text-white transition hover:bg-white/15"
                >
                  <img src={whatsappIcon} alt="" className="h-[26px] w-[26px]" /> Std 5-12th Circle
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const admissionFaqs = [
  {
    question: "What is the rule update for OCI cards issued after March 4, 2021, regarding IIT admissions?",
    answer: [
      "If your child obtained their OCI card subsequent to March 4, 2021, they are considered Foreign National candidates. They are excluded from competing in the general pool with Indian citizens and are eligible only for the 10% Foreign Supernumerary seats.",
    ],
  },
  {
    question: "Does a post-March 4, 2021 OCI holder need to write JEE Main to get into an IIT?",
    answer: [
      "No. OCI students classified under the Foreign National category can bypass the JEE Main exam entirely and register directly for JEE Advanced.",
    ],
  },
  {
    question: "What if the OCI card was issued before March 4, 2021?",
    answer: [
      "These candidates have a choice during JEE Advanced registration: they can apply either as a Foreign National, competing for the 10% supernumerary pool, or at par with Indian Nationals, competing in the OPEN merit category. This choice is final once submitted.",
    ],
  },
  {
    question: "Can OCI/NRI students get into NITs and IIITs without writing JEE Main?",
    answer: [
      "No. Admissions to premium central institutes like NITs, IIITs, and SPAs happen via the DASA (Direct Admission of Students Abroad) scheme, which now strictly requires a JEE Main score. Some pathways may also need SAT scores for eligibility, along with 60% PCM marks in boards.",
    ],
  },
  {
    question: "Can an OCI/NRI/CIWG candidate give MHT-CET?",
    answer: [
      "No. Candidates in these categories (NRI, OCI, CIWG) can apply for direct admission to undergraduate engineering (B.E./B.Tech) and other courses in Maharashtra under the 15% supernumerary quota.",
    ],
  },
  {
    question: "Can an OCI/PIO/NRI get a domicile certificate in Maharashtra?",
    answer: [
      "OCI (Overseas Citizen of India) cardholders cannot independently apply for or obtain a state domicile certificate in Maharashtra. For strict administrative purposes like government employment, OCI holders remain ineligible under The Citizenship Act, 1955.",
    ],
  },
  {
    question: "Is there any reservation in Karnataka for OCI/NRI students in KCET/COMEDK?",
    answer: [
      "The NRI quota: by Supreme Court and National Medical Commission (NMC) guidelines, private and deemed colleges must reserve 15% of their total seats for the NRI category. OCI students are fully eligible to compete for these specific NRI seats.",
      "New OCI regulations: under state regulations governing professional courses like medical/dental, OCIs born on or before March 4, 2021, are not eligible for standard Indian citizen quotas. However, OCI candidates born on or after March 5, 2021, can seek admission through designated NRI seats or supernumerary seats.",
      "Supernumerary seats: some specific institutions and colleges reserve additional supernumerary quotas for foreign and NRI students, allowing them to apply for reduced tuition fees compared to general management seats.",
      "Register with KEA and MCC simultaneously if targeting both private-college and deemed-university seats.",
      "To successfully apply under this quota through the Karnataka Examinations Authority, you will generally need documents verifying NRI status, such as a sponsor's valid passport, work permit, and embassy certificate, along with required NEET or entrance examination scores.",
    ],
  },
  {
    question: "Who qualifies under NRI quota?",
    answer: [
      "Eligibility falls into a few distinct categories, and the exact documentation required differs by which one applies to you.",
      "NRI candidates: the student themselves has lived abroad as a Non-Resident Indian, typically requiring 182+ days per year of residence abroad, with passport and visa stamps as primary proof.",
      "OCI (Overseas Citizen of India) holders: foreign citizens of Indian origin holding an OCI card.",
      "PIO (Person of Indian Origin): an older classification largely merged into OCI now, but still referenced in some college and counselling documentation.",
      "NRI-sponsored candidates: an Indian-resident student sponsored financially by a close NRI relative. Karnataka's rules on this are comparatively more flexible than some other states, but the sponsor must generally be a real blood relation - parent, sibling, aunt, or uncle - supported by an affidavit and relationship proof, not just any NRI willing to pay fees.",
    ],
  },
  {
    question: "What documents are required for NRI quota admission?",
    answer: [
      "Candidate's passport, and visa/residence proof if the candidate themselves holds NRI status.",
      "NRI sponsor's passport and visa stamps, if applying under the NRI-sponsored category.",
      "Relationship proof between candidate and sponsor, such as birth certificate, affidavit, or court-recognised documentation, for sponsored applications.",
      "Embassy Certificate or NOC from the Ministry of External Affairs or the relevant country's embassy/high commission, typically issued within the last 6 months.",
      "NEET UG scorecard for medical admissions or the relevant entrance exam scorecard for other courses.",
      "Class 10 and Class 12 mark sheets, transfer certificate from the last attended institution, migration certificate for students from a foreign education board, character certificate, and passport-sized photographs as per the specific college format.",
    ],
  },
  {
    question: "OCI vs PIO: why will you see both terms?",
    answer: [
      "You will still encounter PIO (Person of Indian Origin) in older college documentation and some counselling materials, even though the Indian government merged the PIO scheme into the OCI (Overseas Citizen of India) scheme some years ago.",
      "For practical purposes today, if you are a foreign citizen of Indian origin, you will be applying with an OCI card, not a separate PIO card. When in doubt, ask the specific college admission office which exact terminology and documentation they currently require, since some institutional paperwork has not fully updated to reflect the OCI consolidation.",
    ],
  },
  {
    question: "When should students start preparing for the admission process?",
    answer: [
      "Start 6-12 months before the intended admission. Confirm which category - NRI, OCI, PIO, or sponsored - genuinely applies, identify which specific documents are required, and take help from your counsellor.",
    ],
  },
  {
    question: "My son is appearing in VITEEE. As an OCI card holder, what will his fee structure be?",
    answer: [
      "He can apply both ways: as an Indian candidate by giving the VITEEE exam, or directly through OCI quota admission.",
    ],
  },
  {
    question: "My son is appearing in SRMJEE. As an OCI card holder, what will his fee structure be?",
    answer: [
      "SRM branches may not all allow the exam route. OCI/NRI/PIO candidates can apply directly with higher fees. Scholarships may be available, including girls' quota and other categories, subject to change with time.",
    ],
  },
  {
    question: "Can an OCI card holder who completed MBBS from India get admission in medical colleges under the general category in NEET PG?",
    answer: [
      "Yes, an OCI card holder who has completed MBBS can get admission in medical college through NEET, subject to the applicable eligibility rules.",
    ],
  },
  {
    question: "What are DASA and CSAB-Special?",
    answer: [
      "DASA and CSAB-Special 2026 shall have two rounds of seat allocation. Interested candidates must complete fresh registration, noting that all processes, including registration, choice filling/locking, seat allotment, and fee payment, differ from JoSAA procedures.",
      "Document verification for DASA candidates shall be done prior to seat allotment. For CSAB candidates, document verification shall be done during the rounds.",
    ],
  },
  {
    question: "Does MHT-CET have any quota for OCI/NRI/CIWGC candidates for courses other than engineering?",
    answer: [
      "Yes. Maharashtra has a supernumerary quota for B.Tech, B.Arch, BBA, B.Pharma, B.Plan, B.Ed, BDS, BHMS, and many more courses.",
    ],
  },
  {
    question: "Is there an NRI quota in NIT?",
    answer: [
      "Yes. NITs (National Institutes of Technology) have an NRI quota. Admission is conducted through the DASA (Direct Admission of Students Abroad) scheme. Under this scheme, up to 15% of the total seats in undergraduate programs are reserved for NRIs, PIOs, OCIs, and Foreign Nationals.",
    ],
  },
  {
    question: "What is the NID B.Des eligibility for overseas candidates?",
    answer: [
      "Foreign candidates holding citizenship in a country other than the Republic of India are eligible to apply under the Overseas (supernumerary) category, provided they fulfil all eligibility requirements for the NID entrance exam mentioned in the official admissions handbook.",
      "Candidates under the Overseas (supernumerary) category fall outside the seats reserved for GEN-EWS, OBC-NCL, SC, ST, and PwD categories. Such candidates cannot avail age relaxation, scribe, or similar facilities as per official eligibility information.",
      "Candidates under the Overseas (supernumerary) category must apply and pay fees as per the Overseas fee structure. Candidates must possess a valid passport, and the passport must be current when applying online.",
      "Non-Resident Indians (NRIs) holding an Indian passport are not eligible to apply under the Overseas (supernumerary) category and must apply as Indian nationals. Before commencement of the programme, the candidate is responsible for obtaining a student visa for the entire programme at NID.",
    ],
  },
  {
    question: "Are DASA and regular admission fees the same or different?",
    answer: [
      "The DASA fee is for applying through the foreign quota, so it is higher than other options. However, it offers the benefit of access to premier engineering colleges through the DASA route.",
    ],
  },
];

function FAQ({ isVisible }: { isVisible: boolean }) {
  return (
    <section id="faq" className={`section-pop ${isVisible ? "is-visible" : ""} py-16 sm:py-20 md:py-28 bg-background`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gold-deep uppercase tracking-wider">FAQ</div>
          <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-primary leading-tight">OCI, NRI, PIO and CIWG admission questions.</h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Key questions families ask while planning Indian admissions under global Indian and foreign national categories.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {admissionFaqs.slice(0, 5).map((faq) => (
            <details key={faq.question} className="card-reveal group rounded-2xl border border-border bg-card shadow-card open:shadow-elegant transition-shadow">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 sm:p-6 text-left">
                <span className="text-base sm:text-lg font-semibold text-primary">
                  {faq.question}
                </span>
                <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-gold-deep transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 space-y-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {faq.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition-transform">
            Know More <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Scholarships({ isVisible }: { isVisible: boolean }) {
  const highlights = [
    { icon: Wallet, title: "Central & State Schemes", desc: "Pre-matric, post-matric, merit-cum-means and minority scholarships — all in one verified portal." },
    { icon: Trophy, title: "Merit & Need Based", desc: "From top-rankers to first-generation learners — funding pathways for every profile and every stream." },
    { icon: BookOpen, title: "Apply with Confidence", desc: "We help you decode eligibility, deadlines and documentation so no deserving student is left behind." },
  ];
  return (
    <section id="scholarships" className={`section-pop ${isVisible ? "is-visible" : ""} py-16 sm:py-20 md:py-32 bg-background`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Scholarships for All</div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-tight">
              Funding the <span className="italic text-gradient-gold">dreams</span> of every learner.
            </h2>
            <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
              Talent should never be limited by tuition. Explore India’s National Scholarship Portal — a single gateway to hundreds of central & state government scholarships for school, college and professional courses.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <a
                href="https://scholarships.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition-transform"
              >
                Explore Scholarships <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md font-semibold border border-primary/20 text-primary hover:bg-secondary transition">
                Get Guidance
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Opens scholarships.gov.in — Government of India National Scholarship Portal.</p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-1 gap-5">
            {highlights.map(h => (
              <div key={h.title} className="card-reveal flex items-start gap-4 sm:gap-5 bg-card border border-border rounded-2xl p-5 sm:p-6 md:p-7 shadow-card hover:shadow-elegant transition-shadow">
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

function Internships({ isVisible }: { isVisible: boolean }) {
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
    <section id="internships" className={`section-pop ${isVisible ? "is-visible" : ""} py-16 sm:py-20 md:py-32 bg-surface`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Internships & Research</div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-tight">
            Build proof, not just <span className="italic text-gradient-gold">potential</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Stand out in admissions with real-world experience. We help students secure internships, publish research, and craft portfolios that colleges actually notice.
          </p>
        </div>
        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-5 md:gap-6">
          {cards.map((c, i) => (
            <div key={c.title} className={`card-reveal group flex items-start gap-4 sm:gap-5 bg-card border border-border rounded-2xl p-5 sm:p-6 md:p-7 shadow-card hover:shadow-elegant transition-shadow ${i % 2 === 1 ? "delay-100" : ""}`}>
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
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row sm:flex-wrap gap-3">
          <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition-transform">
            Get Started <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md font-semibold border border-primary/20 text-primary hover:bg-secondary transition">
            Ask About Opportunities
          </a>
        </div>
      </div>
    </section>
  );
}

function About({ isVisible }: { isVisible: boolean }) {
  return (
    <section id="about" className={`section-pop ${isVisible ? "is-visible" : ""} pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-32 md:pb-16 bg-background`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">About</div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-tight">Meet your lead counselor &amp; expert team.</h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">A personalized roadmap, driven by domain specialists.</p>
        </div>

        <div className="mt-10 md:mt-16 max-w-3xl">
          <div className="card-reveal bg-surface border border-border rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-10 shadow-card">
            <div>
              <h3 className="text-2xl font-display font-semibold text-primary">Rupali Rathore</h3>
              <div className="text-sm font-medium text-gold-deep mt-1">Lead Career Counselor &amp; Founder</div>
              <blockquote className="mt-6 text-sm sm:text-base text-foreground/85 leading-relaxed border-l-2 border-gold pl-4 sm:pl-5 italic">
                “Every student deserves more than just a template for their future they deserve a personalized, strategic compass. My mission is to deeply understand your unique strengths, reduce the overwhelming anxiety of admissions, and match you with the precise industry veterans who can unlock your dream career. I specialize in navigating the complex web of OCI, NRI, and CIWG admissions, helping global Indian families secure seats in India's top colleges, central universities, and state-level institutions by leveraging government-mandated quotas and specialized entry pathways. We don’t just look at grades; we craft trajectories with empathy, clarity, and measurable results.”
              </blockquote>
            </div>
          </div>
        </div>

        <div className="card-reveal mt-10 md:mt-14 rounded-2xl border border-gold/30 bg-gradient-to-br from-accent to-surface p-5 sm:p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-gold-deep">Why Career Craft Youth?</div>
            <p className="mt-2 text-base sm:text-lg text-primary max-w-2xl">
              By blending modern psychometric analysis with the collective wisdom of seasoned academic and corporate mentors, we ensure our students get a massive competitive edge.
            </p>
          </div>
          <a href="#contact" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.02] transition-transform">
            Schedule My Discovery Call <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ isVisible }: { isVisible: boolean }) {
  const [publishedTestimonials, setPublishedTestimonials] = useState<Testimonial[]>([]);
  const shouldAutoScroll = publishedTestimonials.length > 1;

  useEffect(() => {
    let mounted = true;

    getSupabaseClient()
      .from("testimonials")
      .select("id, quote, name, role, rating, status, display_order, created_at, updated_at")
      .eq("status", "published")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!mounted) return;
        setPublishedTestimonials((data ?? []) as Testimonial[]);
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="testimonials" className={`section-pop ${isVisible ? "is-visible" : ""} py-16 sm:py-20 md:py-32 bg-surface`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Testimonials</div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-tight">
              Voices of <span className="italic text-gradient-gold">trust</span> &amp; transformation.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              Real stories from parents and students whose futures we helped shape — one decision at a time.
            </p>
          </div>
        </div>

        <div className="testimonial-marquee mt-10 md:mt-14 pb-4">
          {publishedTestimonials.length === 0 ? (
            <div className="w-full rounded-2xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
              No testimonials published yet.
            </div>
          ) : (
            <div className={`testimonial-marquee-track ${shouldAutoScroll ? "" : "testimonial-marquee-track-static"}`}>
              {[0, 1].slice(0, shouldAutoScroll ? 2 : 1).map((setIndex) => (
                <div key={setIndex} className="testimonial-marquee-set" aria-hidden={setIndex > 0}>
                  {publishedTestimonials.map((t) => (
                    <div
                      key={`${t.id}-${setIndex}`}
                      data-card
                      className="card-reveal group bg-card border border-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-card hover:shadow-elegant transition-all duration-300 flex flex-col min-w-[calc(100vw-2rem)] sm:min-w-[320px] md:min-w-[380px] max-w-[380px]"
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
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function LandingPhotos({ isVisible }: { isVisible: boolean }) {
  const [publishedPhotos, setPublishedPhotos] = useState<LandingPhoto[]>([]);
  const shouldAutoScroll = publishedPhotos.length > 1;

  useEffect(() => {
    let mounted = true;

    getSupabaseClient()
      .from("landing_page_photos")
      .select("id, image_url, storage_path, alt_text, status, display_order, created_at, updated_at")
      .eq("status", "published")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!mounted) return;
        setPublishedPhotos((data ?? []) as LandingPhoto[]);
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  if (publishedPhotos.length === 0) return null;

  return (
    <section id="photos" className={`section-pop ${isVisible || publishedPhotos.length > 0 ? "is-visible" : ""} pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-16 md:pb-32 bg-background`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold text-gold-deep uppercase tracking-wider">Photos</div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-primary leading-tight">
            Moments from <span className="italic text-gradient-gold">Career Craft Youth</span>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            A glimpse of our sessions, guidance work, and student community.
          </p>
        </div>

        <div className="testimonial-marquee mt-10 md:mt-14 pb-4">
          <div className={`testimonial-marquee-track ${shouldAutoScroll ? "" : "testimonial-marquee-track-static"}`}>
            {[0, 1].slice(0, shouldAutoScroll ? 2 : 1).map((setIndex) => (
              <div key={setIndex} className="testimonial-marquee-set" aria-hidden={setIndex > 0}>
                {publishedPhotos.map((photo, index) => (
                  <div
                    key={`${photo.id}-${setIndex}`}
                    className={`card-reveal overflow-hidden rounded-2xl border border-border bg-card shadow-card min-w-[56vw] sm:min-w-[236px] md:min-w-[293px] max-w-[293px] ${index % 3 === 1 ? "delay-100" : index % 3 === 2 ? "delay-200" : ""}`}
                  >
                    <img
                      src={photo.image_url}
                      alt={photo.alt_text ?? "Career Craft Youth photo"}
                      className="h-[calc((100vw-2rem)*0.75)] w-full bg-secondary object-cover sm:h-[315px] md:h-[390px]"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ isVisible, socialLinks }: { isVisible: boolean; socialLinks: SocialLinks }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      full_name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      grade_interest: String(formData.get("interest") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const { error } = await getSupabaseClient()
        .from("contact_submissions")
        .insert(payload);

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`section-pop ${isVisible ? "is-visible" : ""} py-16 sm:py-20 md:py-32 bg-hero-gradient text-white relative overflow-hidden`}>
      <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-gold-gradient opacity-10 blur-3xl rounded-full" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 md:gap-14">
        <div>
          <div className="text-sm font-semibold text-gold uppercase tracking-wider">Get in Touch</div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-display font-semibold leading-tight">Let’s craft your trajectory.</h2>
          <p className="mt-5 text-white/80 text-base sm:text-lg max-w-md">Share a few details and our team will reach out within 24 hours to schedule your discovery call.</p>
          <div className="mt-10 space-y-4 text-white/80">
            <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold" /><span>+917028162977 Available on request</span></div>
            <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-gold" /><span>career.craftyouth@gmail.com</span></div>
            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gold" /><span>India · Serving Global Indians worldwide</span></div>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <a href={socialLinks.facebook} aria-label="Facebook" className="w-10 h-10 grid place-items-center rounded-full border border-white/20 hover:bg-white/10 transition"><Facebook className="w-4 h-4" /></a>
            <a href={socialLinks.instagram} aria-label="Instagram" className="w-10 h-10 grid place-items-center rounded-full border border-white/20 hover:bg-white/10 transition"><Instagram className="w-4 h-4" /></a>
            <a href={socialLinks.linkedin} aria-label="LinkedIn" className="w-10 h-10 grid place-items-center rounded-full border border-white/20 hover:bg-white/10 transition"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-reveal bg-white text-foreground rounded-2xl p-5 sm:p-6 md:p-10 shadow-elegant"
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
                  <select name="interest" required className="mt-1.5 w-full px-4 py-3 rounded-md border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
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
                  <textarea name="message" rows={4} placeholder="Tell us a little about your goals…" className="mt-1.5 w-full px-4 py-3 rounded-md border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                {submitError && (
                  <p className="text-sm font-medium text-destructive">{submitError}</p>
                )}
                <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 bg-gold-gradient text-gold-foreground px-6 py-3.5 rounded-md font-semibold shadow-gold hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? "Submitting..." : "Schedule My Discovery Call"} <ArrowRight className="w-4 h-4" />
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

function Footer({ socialLinks }: { socialLinks: SocialLinks }) {
  return (
    <footer className="bg-primary-deep text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16 grid md:grid-cols-4 gap-8 md:gap-10">
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
            <a href={socialLinks.facebook} aria-label="Facebook" className="grid place-items-center transition hover:opacity-80">
              <img src="/social/facebook.svg" alt="" className="w-7 h-7" loading="lazy" />
            </a>
            <a href={socialLinks.instagram} aria-label="Instagram" className="grid place-items-center transition hover:opacity-80">
              <img src="/social/instagram.svg" alt="" className="w-7 h-7" loading="lazy" />
            </a>
            <a href={socialLinks.linkedin} aria-label="LinkedIn" className="grid place-items-center transition hover:opacity-80">
              <img src="/social/linkedin.svg" alt="" className="w-7 h-7" loading="lazy" />
            </a>
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
            <li><a href="#photos" className="hover:text-gold">Photos</a></li>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-xs text-white/55 flex flex-col md:flex-row gap-2 md:justify-between">
          <div>© {new Date().getFullYear()} Career Craft Youth. All rights reserved.</div>
          <div>Crafted with empathy, clarity &amp; measurable results.</div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  const [activeSection, setActiveSection] = useState("");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(() => new Set());
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(DEFAULT_SOCIAL_LINKS);

  useEffect(() => {
    let mounted = true;

    getSupabaseClient()
      .from("site_settings")
      .select("value")
      .eq("key", "social_links")
      .maybeSingle()
      .then(({ data }) => {
        if (!mounted || !data?.value || typeof data.value !== "object") return;
        const value = data.value as Partial<SocialLinks>;
        setSocialLinks({
          facebook: value.facebook || DEFAULT_SOCIAL_LINKS.facebook,
          instagram: value.instagram || DEFAULT_SOCIAL_LINKS.instagram,
          linkedin: value.linkedin || DEFAULT_SOCIAL_LINKS.linkedin,
        });
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.id);
        }
        setVisibleSections((prev) => {
          let next = prev;
          for (const entry of entries) {
            if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
            const id = entry.target.id;
            if (prev.has(id)) continue;
            if (next === prev) next = new Set(prev);
            next.add(id);
          }
          return next;
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header activeSection={activeSection} socialLinks={socialLinks} />
      <Hero />
      <Services isVisible={visibleSections.has("services")} />
      <Discovery isVisible={visibleSections.has("discovery")} />
      <Community isVisible={visibleSections.has("community")} />
      <Scholarships isVisible={visibleSections.has("scholarships")} />
      <Internships isVisible={visibleSections.has("internships")} />
      <About isVisible={visibleSections.has("about")} />
      <LandingPhotos isVisible={visibleSections.has("photos")} />
      <Testimonials isVisible={visibleSections.has("testimonials")} />
      <FAQ isVisible={visibleSections.has("faq")} />
      <Contact isVisible={visibleSections.has("contact")} socialLinks={socialLinks} />
      <Footer socialLinks={socialLinks} />
    </main>
  );
}
