"use client";

import { useMemo, useState } from "react";
import type { CapabilityNode } from "@/lib/hierarchy";

const DEPTH_PAD_CLASSES = [
  "",
  "pl-6 border-l border-dashed border-zinc-200",
  "pl-10 border-l border-dashed border-zinc-200",
  "pl-14 border-l border-dashed border-zinc-200",
  "pl-16 border-l border-dashed border-zinc-200",
];

const pickDepthClass = (depth: number) =>
  DEPTH_PAD_CLASSES[Math.min(depth, DEPTH_PAD_CLASSES.length - 1)];

const ToggleButton = ({
  expanded,
  onClick,
}: {
  expanded: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold transition ${
      expanded
        ? "border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800"
        : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-900"
    }`}
    aria-expanded={expanded}
  >
    {expanded ? "–" : "+"}
  </button>
);

const SignalsList = ({
  label,
  items,
}: {
  label: string;
  items?: string[];
}) => {
  if (!items?.length) return null;

  return (
    <div className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </div>
      <ul className="space-y-1 text-sm text-zinc-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NodeCard = ({
  node,
  depth,
  expanded,
  toggle,
}: {
  node: CapabilityNode;
  depth: number;
  expanded: Record<string, boolean>;
  toggle: (id: string) => void;
}) => {
  const isBranchOpen = expanded[node.id] ?? depth === 0;
  const paddingClass = useMemo(() => pickDepthClass(depth), [depth]);

  return (
    <li className={`space-y-6 ${depth > 0 ? "pt-6" : ""}`}>
      <div
        className={`relative rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-sm backdrop-blur ${
          depth > 0 ? "before:absolute before:-left-3 before:top-7 before:h-[calc(100%+24px)] before:w-px before:bg-gradient-to-b before:from-zinc-200 before:via-zinc-100 before:to-transparent" : ""
        }`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {depth === 0 ? "Pillar" : `Layer ${depth + 1}`}
            </span>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900">{node.title}</h3>
              <p className="text-sm text-zinc-600">{node.summary}</p>
            </div>
          </div>
          {node.children?.length ? (
            <ToggleButton expanded={isBranchOpen} onClick={() => toggle(node.id)} />
          ) : null}
        </div>
        <div className="mt-4 space-y-4">
          <SignalsList label="Core Competencies" items={node.competencies} />
          <SignalsList label="Signals of Mastery" items={node.signals} />
        </div>
      </div>
      {node.children && node.children.length ? (
        <ul className={`${paddingClass} space-y-6 ${isBranchOpen ? "opacity-100" : "hidden"}`}>
          {node.children.map((child) => (
            <NodeCard
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              toggle={toggle}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export const HierarchyTree = ({ data }: { data: CapabilityNode[] }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    data.forEach((pillar) => {
      initial[pillar.id] = true;
    });
    return initial;
  });

  const toggle = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ul className="space-y-10">
      {data.map((node) => (
        <NodeCard key={node.id} node={node} depth={0} expanded={expanded} toggle={toggle} />
      ))}
    </ul>
  );
};
