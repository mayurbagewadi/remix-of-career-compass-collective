import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Career Assessment | Career Craft Youth" },
      { name: "description", content: "Complete your career assessment with Career Craft Youth." },
    ],
  }),
  component: Assessment,
});

function Assessment() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold-deep">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <div className="mt-8 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-wider text-gold-deep">Assessment</div>
            <h1 className="mt-3 text-4xl font-semibold text-primary md:text-5xl">Your career assessment.</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
        <div id="tuassessment-load" data-manager="TUB0468"></div>
        <style
          id="tuframestyle"
          dangerouslySetInnerHTML={{
            __html: `/* Style to be applied to candidate details  form*/`,
          }}
        />
        <script src="https://beacon.tucareers.com/sites/all/modules/assessment_widget/js/assessment_iframe.js"></script>
      </section>
    </main>
  );
}
