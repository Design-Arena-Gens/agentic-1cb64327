import Link from "next/link";
import { HierarchyTree } from "@/components/hierarchy-tree";
import { hierarchy } from "@/lib/hierarchy";

const PillarStat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white/80 p-6 text-left shadow-sm">
    <span className="text-3xl font-semibold text-zinc-900">{value}</span>
    <span className="text-sm uppercase tracking-wide text-zinc-500">{label}</span>
  </div>
);

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-50 via-white to-zinc-100">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-200/40 blur-[160px]" />
      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-20 px-6 pb-32 pt-24 sm:px-10 lg:px-16">
        <header className="space-y-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
                Hierarchical Structured AI Generalist
              </span>
              <h1 className="text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
                Build and assess end-to-end AI execution using a layered competency map.
              </h1>
              <p className="text-lg text-zinc-600">
                This framework breaks the modern AI generalist into navigable pillars. Explore the layers, trace competencies, and apply the signals of mastery to your hiring, enablement, and personal growth tracks.
              </p>
              <div className="flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Adaptive knowledge model
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                  Cross-disciplinary playbooks
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-violet-500" />
                  Capability-based assessments
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-left sm:w-fit">
              <PillarStat label="Pillars" value={`${hierarchy.length}`} />
              <PillarStat
                label="Competency threads"
                value={`${hierarchy.reduce(
                  (total, node) => total + (node.competencies?.length ?? 0),
                  0,
                )}+`}
              />
              <PillarStat
                label="Signals catalog"
                value={`${hierarchy.reduce(
                  (total, node) =>
                    total +
                    (node.signals?.length ?? 0) +
                    (node.children?.reduce(
                      (childTotal, child) => childTotal + (child.signals?.length ?? 0),
                      0,
                    ) ?? 0),
                  0,
                )}`}
              />
              <PillarStat label="Layers" value="3" />
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-sm text-zinc-600">
              <p className="font-semibold text-zinc-800">How to use the map:</p>
              <p>
                Start at the pillar overview, drill into deeper layers, and log observable signals as evidence. Use the canvas below to orchestrate growth plans, role definitions, or AI transformation roadmaps.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="#capability-map"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Explore Map
              </Link>
              <Link
                href="#operating-modes"
                className="inline-flex items-center justify-center rounded-full border border-emerald-200 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-800"
              >
                Operating Modes
              </Link>
            </div>
          </div>
        </header>

        <section id="capability-map" className="space-y-12">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-semibold text-zinc-900">Capability Map</h2>
            <p className="text-base text-zinc-600">
              Each layer nests within the one above it. Expand nodes to reveal granular mastery signals and use them as interview rubrics, simulation prompts, or self-assessment criteria.
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-sm">
            <HierarchyTree data={hierarchy} />
          </div>
        </section>

        <section id="operating-modes" className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold text-zinc-900">Operating Modes</h2>
            <p className="text-base text-zinc-600">
              Blend these modes to cover discovery, delivery, and governance in AI programs. Each mode references capabilities above and offers immediate actions.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[{
              title: "Sensemaking Sprints",
              description:
                "Rapidly map ambiguous territories by combining user narratives, data cuts, and system constraints into a single hypothesis backlog.",
              actions: [
                "Catalog facts vs. assumptions with validation owners",
                "Design instrumentation to expose blind spots",
                "Publish a north-star memo with experiment sequencing",
              ],
            },
            {
              title: "Delivery Orchestration",
              description:
                "Coordinate multi-disciplinary squads that ship measurable value while keeping responsible AI guardrails tight.",
              actions: [
                "Define readiness checklists gated by capability signals",
                "Automate deployment + rollback paths with clear metrics",
                "Codify decision logs for transparency and audits",
              ],
            },
            {
              title: "Momentum Stewardship",
              description:
                "Sustain adoption and learning by pairing enablement loops with product telemetry and voice-of-customer insights.",
              actions: [
                "Stand up success scorecards with leading indicators",
                "Run quarterly retros across disciplines to tune the map",
                "Invest in community rituals that broadcast wins",
              ],
            }].map((mode) => (
              <div
                key={mode.title}
                className="flex h-full flex-col gap-4 rounded-3xl border border-zinc-200 bg-white/80 p-6 shadow-sm"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-zinc-900">{mode.title}</h3>
                  <p className="text-sm text-zinc-600">{mode.description}</p>
                </div>
                <div className="space-y-2 text-sm text-zinc-700">
                  {mode.actions.map((action) => (
                    <div key={action} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-none rounded-full bg-emerald-500" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-zinc-200 bg-white/70 p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl font-semibold text-zinc-900">Run Your Transformation Loop</h2>
              <p className="text-base text-zinc-600">
                Apply the hierarchy to progress tracking, capability academies, or product strategy artifacts. The toolkit below gives you a turnkey starting point.
              </p>
            </div>
            <Link
              href="https://miro.com"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Download Toolkit
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "Assessment Canvas",
                description: "Score each capability by evidence, velocity, and leverage to prioritize enablement investments.",
              },
              {
                label: "Playbook Library",
                description: "Launch recipes for discovery workshops, technical diagnostics, and governance councils.",
              },
              {
                label: "Learning Tracks",
                description: "Pair self-serve journeys with mentorship loops mapped to capability milestones.",
              },
            ].map((item) => (
              <div key={item.label} className="space-y-2 rounded-2xl border border-zinc-200 bg-white/60 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  {item.label}
                </h3>
                <p className="text-sm text-zinc-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
