import { memo } from "react";

const toneClasses = {
  red: "bg-red-500/10 text-red-300 ring-red-500/20",
  amber: "bg-amber-400/10 text-amber-200 ring-amber-400/20",
  emerald: "bg-emerald-400/10 text-emerald-200 ring-emerald-400/20",
  sky: "bg-sky-400/10 text-sky-200 ring-sky-400/20",
};

function StatsCard({ title, value, icon, detail, tone = "red" }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 shadow-lg shadow-black/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white">{value}</p>
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded-xl text-lg ring-1 ${toneClasses[tone]}`}>
          {icon}
        </span>
      </div>
      {detail && <p className="mt-4 text-xs text-zinc-500">{detail}</p>}
    </article>
  );
}

export default memo(StatsCard);
