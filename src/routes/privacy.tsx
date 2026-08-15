import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Career Craft Youth" },
      { name: "description", content: "Privacy policy for Career Craft Youth's career assessment and guidance services." },
    ],
  }),
  component: Privacy,
});

const paragraphs = [
  "Your Privacy is important to us and we fully respect your right to the same. Outlined here are guidelines we follow for the personal identifiable information (PII) we collect for the career assessment and guidance tests on our site (Services), the purpose and consequent consent for the usage of your private information.We collect personally identifiable information (PII) and various other non PII information (like inputs for assessments called assessment data) from the users for offering our career assessment and guidance service. Personal information collected may include name, email address, telephone number, age and other such data. We require these details and other assessment data collected to provide the services we offer. We also reach out to our users for their feedback on their usage of our services and with offers and promotions etc.",
  "PII and non PII data collected for delivering our services will be exposed to employees, suppliers (e.g. technology providers).At an aggregate level the data collated would also be used for the purpose of research and owing to the same we reserve the right to collect and share with third parties demographic, psychometric and other anonymous information (e.g. aggregate statistical information) that does not personally identify you. Your PII and other data is stored by us securely. Although we provide appropriate security protections, we cannot warrant the security of any Personal Information transmitted as these systems are not hack proof. Data pilferage due to unauthorized hacking, virus attacks, technical issues is possible, and we take no liabilities or responsibilities for it. We will retain the Personal Information for as long as it is required to be retained for the purpose of provision of the Services and to comply with our legal obligations.",
  "By continuing to use the Services or access the Site, you agree to this Privacy Policy. If you do not agree with this Privacy Policy, you may not avail the Services or access the Site. You also have the choice to not provide personal information, however some of our services would not be accessible in that case. We reserve the right to make changes in this policy and we indicate all such change in this section of the website. A user of our Services can get their Personal Identifiable Information deleted by contacting us at career.craftyouth@gmail.com. Please note, however, that there might be latency in retrieving and deleting Personal Information from our servers (up to 30 days). We are committed to maintain the highest standards of integrity and discretion in our operations and in case you have any feedback / comments please don’t hesitate to write to us at career.craftyouth@gmail.com",
];

function Privacy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold-deep">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <div className="mt-8 max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-wider text-gold-deep">Legal</div>
            <h1 className="mt-3 text-4xl font-semibold text-primary md:text-5xl">Privacy Policy</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
        <div className="space-y-5 text-base leading-relaxed text-foreground/85">
          {paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
