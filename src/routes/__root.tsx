import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Career Craft Youth | Career Counselling & Admission Guidance" },
      { name: "description", content: "Career Craft Youth provides psychometric career counselling, admission guidance, study abroad planning, scholarships, internships, and Global Indian OCI/NRI support." },
      { name: "author", content: "Career Craft Youth" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Career Craft Youth | Career Counselling & Admission Guidance" },
      { property: "og:description", content: "Psychometric career counselling, admission strategy, study abroad planning, scholarships, internships, and OCI/NRI guidance." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://careercraftyouth.in/" },
      { name: "twitter:site", content: "https://careercraftyouth.in/" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Career Craft Youth" },
      { name: "twitter:description", content: "Career counselling and admission guidance for students and Global Indian families." },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        name: "Career Craft Youth",
        url: "https://careercraftyouth.in/",
        description: "Career counselling, psychometric analysis, admission guidance, study abroad planning, scholarships, internships, and Global Indian OCI/NRI support.",
        email: "career.craftyouth@gmail.com",
        areaServed: ["India", "Global Indian families", "NRI families", "OCI families", "PIO families"],
        sameAs: [
          "https://www.facebook.com/profile.php?id=61576293282096",
          "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=zkjqm3r",
          "https://www.linkedin.com/in/rupali-rathore",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "career.craftyouth@gmail.com",
          contactType: "Admissions and career counselling inquiry",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Career Craft Youth services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Psychometric career counselling",
                description: "Career counselling and stream discovery for students using psychometric analysis.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Admission guidance",
                description: "Admissions strategy for Indian and international colleges, including professional streams.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Global Indian admission support",
                description: "OCI, PIO, NRI, and CIWG admission guidance for Global Indian families.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Scholarship and internship guidance",
                description: "Scholarship discovery, application guidance, internship support, and research profile building.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        name: "Career Craft Youth",
        url: "https://careercraftyouth.in/",
        description: "Career counselling and admission guidance for students and Global Indian families.",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
