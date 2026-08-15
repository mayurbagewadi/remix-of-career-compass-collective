import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/start-test")({
  head: () => ({
    meta: [
      { title: "Start Your Career Assessment | Career Craft Youth" },
      { name: "description", content: "Begin your psychometric career assessment with Career Craft Youth." },
    ],
  }),
  component: StartTest,
});

function StartTest() {
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
            <h1 className="mt-3 text-4xl font-semibold text-primary md:text-5xl">Start your career assessment.</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
        <script src="https://beacon.tucareers.com/sites/all/modules/assessment_widget/js/assessment_widget.js"></script>
        <div id="tu-widget"></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `TuWidget({
"start_form_div":"tu-widget",
"manager":"TUB0468",
"data_inquiry_show":0,
"data_inquiry_pop_up":0,
"data_free_show":0,
"data_free_pop_up":0,
"inquiry_form_div":"",
"start_form_css":{},
"inquiry_form_css":{},
"free_form_div": "",
"free_form_css":{},
"primary_assessment": ""
});`,
          }}
        />
      </section>
    </main>
  );
}
