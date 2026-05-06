import Link from "next/link";
import PageV0 from "@/components/ui/page-v0/PageV0";

type ServiceDetailPageProps = {
  title: string;
  eyebrow: string;
  summary: string;
  deliverables: string[];
  outcomes: string[];
};

function ServiceDetailPage(props: ServiceDetailPageProps) {
  const { title, eyebrow, summary, deliverables, outcomes } = props;

  return (
    <PageV0>
      <section className="w-full max-w-6xl px-6 py-24 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black/45">
              {eyebrow}
            </p>
            <h1 className="text-5xl font-black leading-none text-black md:text-7xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-black/70 md:text-2xl">
              {summary}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[2rem] border border-black/10 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm md:p-8">
              <h2 className="text-2xl font-bold text-black">What is included</h2>
              <ul className="mt-5 flex flex-col gap-3 text-base leading-7 text-black/75">
                {deliverables.map((item) => (
                  <li key={item} className="rounded-2xl bg-black/[0.03] px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[2rem] border border-black/10 bg-[#f7f1e8] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-8">
              <h2 className="text-2xl font-bold text-black">What you get out of it</h2>
              <ul className="mt-5 flex flex-col gap-3 text-base leading-7 text-black/75">
                {outcomes.map((item) => (
                  <li key={item} className="rounded-2xl bg-white/70 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="flex flex-col gap-4 rounded-[2rem] border border-black/10 bg-black px-6 py-8 text-white md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <h2 className="text-2xl font-bold">Need this service for your brand?</h2>
              <p className="mt-2 max-w-2xl text-white/70">
                Tell Bodilum what you are building and we will recommend the best scope, timeline, and next step.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#fc6d05] px-6 text-sm font-semibold text-black transition hover:brightness-95"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </PageV0>
  );
}

export default ServiceDetailPage;