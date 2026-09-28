"use client";
import { useMemo, useState } from "react";

type Opt = { id: string; name: string; price: number; note: string };
const DESKS: Opt[] = [
  { id: "oak", name: "Oak desk", price: 45, note: "Solid, 140 cm" },
  { id: "stand", name: "Standing desk", price: 75, note: "Electric height" },
  { id: "corner", name: "Compact desk", price: 30, note: "120 cm, light" },
];
const CHAIRS: Opt[] = [
  { id: "ergo", name: "Ergonomic chair", price: 40, note: "Lumbar support" },
  { id: "mesh", name: "Mesh chair", price: 25, note: "Breathable, simple" },
  { id: "stool", name: "Saddle stool", price: 30, note: "Active sitting" },
];
type Acc = { id: string; name: string; emoji: string; price: number; max: number; zone: "desk" | "extra" };
const ACCS: Acc[] = [
  { id: "monitor", name: "Monitor 27\"", emoji: "🖥️", price: 25, max: 3, zone: "desk" },
  { id: "lamp", name: "Desk lamp", emoji: "💡", price: 6, max: 1, zone: "desk" },
  { id: "plant", name: "Plant", emoji: "🪴", price: 5, max: 2, zone: "desk" },
  { id: "headset", name: "Headphones", emoji: "🎧", price: 8, max: 1, zone: "desk" },
  { id: "coffee", name: "Coffee machine", emoji: "☕", price: 20, max: 1, zone: "extra" },
  { id: "surf", name: "Surfboard", emoji: "🏄", price: 15, max: 1, zone: "extra" },
  { id: "bike", name: "Motorcycle", emoji: "🏍️", price: 90, max: 1, zone: "extra" },
  { id: "bean", name: "Bean bag", emoji: "🛋️", price: 12, max: 1, zone: "extra" },
  { id: "tools", name: "Tool shelf", emoji: "🧰", price: 14, max: 1, zone: "extra" },
];
const TERMS = [{ m: 1, off: 0 }, { m: 3, off: 0.05 }, { m: 6, off: 0.1 }];
const usd = (n: number) => `$${n.toFixed(0)}`;

function Chair({ id }: { id: string }) {
  const c = id === "ergo" ? "#e8684a" : id === "mesh" ? "#2f7d6d" : "#d9b26a";
  return (
    <g className="drop" key={id}>
      {id !== "stool" && <rect x="248" y="150" width="14" height="70" rx="7" fill={c} />}
      <rect x="240" y={id === "stool" ? 195 : 205} width="70" height="14" rx="7" fill={c} />
      <rect x="272" y={id === "stool" ? 209 : 209} width="6" height="40" fill="#1b3a32" />
      <path d="M250 262h50M275 249v13" stroke="#1b3a32" strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

export default function Home() {
  const [desk, setDesk] = useState("oak");
  const [chair, setChair] = useState("ergo");
  const [qty, setQty] = useState<Record<string, number>>({ monitor: 1 });
  const [term, setTerm] = useState(TERMS[1]);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const change = (id: string, d: number, max: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(max, (q[id] || 0) + d)) }));

  const lines = useMemo(() => {
    const l: { name: string; price: number; n: number }[] = [];
    const d = DESKS.find((x) => x.id === desk)!, c = CHAIRS.find((x) => x.id === chair)!;
    l.push({ name: d.name, price: d.price, n: 1 }, { name: c.name, price: c.price, n: 1 });
    ACCS.forEach((a) => (qty[a.id] || 0) > 0 && l.push({ name: a.name, price: a.price, n: qty[a.id] }));
    return l;
  }, [desk, chair, qty]);
  const monthly = lines.reduce((s, l) => s + l.price * l.n, 0);
  const perMonth = monthly * (1 - term.off);
  const total = perMonth * term.m;

  const deskTop = desk === "stand" ? 170 : 195;
  const deskW = desk === "corner" ? 250 : 340;
  const x0 = 300 - deskW / 2;
  const slots = (id: string, n: number) =>
    Array.from({ length: n }, (_, i) => {
      if (id === "monitor") return x0 + 30 + (i * (deskW - 60)) / Math.max(n, 1) + (deskW - 60) / Math.max(n, 1) / 2 - 30;
      if (id === "lamp") return x0 + deskW - 55;
      if (id === "plant") return x0 + 10 + i * 46;
      return x0 + deskW / 2 + 10;
    });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 lg:py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Design your workspace</h1>
        <p className="mt-2 max-w-xl text-sand/70">Start with a desk and a chair, add what you need, and rent the whole setup in Bali for as long as you stay.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section aria-label="Preview" className="rounded-3xl bg-gradient-to-b from-moss to-jungle p-4 ring-1 ring-sand/10">
          <svg viewBox="0 0 600 340" className="w-full" role="img" aria-label="Workspace preview">
            <ellipse cx="300" cy="285" rx="285" ry="42" fill="#efe3cc" opacity=".92" />
            <ellipse cx="300" cy="285" rx="285" ry="42" fill="none" stroke="#2f7d6d" strokeWidth="3" />
            <Chair id={chair} />
            <g key={desk} className="drop">
              <rect x={x0} y={deskTop} width={deskW} height="14" rx="5" fill={desk === "stand" ? "#c9c2b0" : "#b9814a"} />
              <rect x={x0 + 18} y={deskTop + 14} width="10" height={270 - deskTop} fill="#8a5d33" />
              <rect x={x0 + deskW - 28} y={deskTop + 14} width="10" height={270 - deskTop} fill="#8a5d33" />
            </g>
            {ACCS.filter((a) => a.zone === "desk").flatMap((a) =>
              slots(a.id, qty[a.id] || 0).map((x, i) => (
                <text key={`${a.id}${i}${qty[a.id]}`} className="drop" x={x} y={deskTop + 4} fontSize={a.id === "monitor" ? 64 : 40} textAnchor="start">{a.emoji}</text>
              ))
            )}
          </svg>
          <div className="mt-2 flex min-h-[64px] flex-wrap items-end justify-center gap-4 text-5xl" aria-label="Extras">
            {ACCS.filter((a) => a.zone === "extra" && qty[a.id]).map((a) => (
              <span key={a.id} className="drop" title={a.name}>{a.emoji}</span>
            ))}
            {!ACCS.some((a) => a.zone === "extra" && qty[a.id]) && (
              <p className="text-sm text-sand/50">Add a coffee machine, surfboard or motorcycle to see them here.</p>
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <Picker title="Desk" opts={DESKS} value={desk} onPick={setDesk} />
          <Picker title="Chair" opts={CHAIRS} value={chair} onPick={setChair} />
          {(["desk", "extra"] as const).map((z) => (
            <div key={z}>
              <h2 className="mb-2 text-lg font-bold">{z === "desk" ? "On your desk" : "Around the space"}</h2>
              <ul className="space-y-2">
                {ACCS.filter((a) => a.zone === z).map((a) => (
                  <li key={a.id} className="flex items-center gap-3 rounded-xl bg-moss px-3 py-2">
                    <span className="text-2xl" aria-hidden>{a.emoji}</span>
                    <span className="flex-1 text-sm">{a.name}<br /><span className="text-sand/60">{usd(a.price)}/mo</span></span>
                    <button aria-label={`Remove ${a.name}`} onClick={() => change(a.id, -1, a.max)} className="h-8 w-8 rounded-full bg-jungle text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral">−</button>
                    <span className="w-4 text-center tabular-nums">{qty[a.id] || 0}</span>
                    <button aria-label={`Add ${a.name}`} onClick={() => change(a.id, 1, a.max)} className="h-8 w-8 rounded-full bg-teal text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral">+</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>

      <div className="sticky bottom-4 mt-8 flex items-center justify-between gap-4 rounded-2xl bg-sand px-5 py-4 text-jungle shadow-xl">
        <div><p className="text-sm">Your setup</p><p className="text-2xl font-extrabold">{usd(monthly)}<span className="text-base font-medium">/month</span></p></div>
        <button onClick={() => { setDone(false); setOpen(true); }} className="rounded-full bg-coral px-6 py-3 font-bold text-white hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-jungle">Rent this setup</button>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Your rental summary" className="fixed inset-0 z-10 grid place-items-center bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div className="drop w-full max-w-md rounded-3xl bg-sand p-6 text-jungle" onClick={(e) => e.stopPropagation()}>
            {done ? (
              <div className="py-6 text-center">
                <p className="text-5xl">🌴</p>
                <h2 className="mt-3 text-2xl font-extrabold">Request sent</h2>
                <p className="mt-1">We will message you to confirm delivery in Bali.</p>
                <button onClick={() => setOpen(false)} className="mt-5 rounded-full bg-jungle px-6 py-2 font-bold text-sand">Close</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold">Your rental summary</h2>
                <ul className="mt-4 divide-y divide-jungle/15">
                  {lines.map((l) => (
                    <li key={l.name} className="flex justify-between py-2"><span>{l.name}{l.n > 1 && ` × ${l.n}`}</span><span>{usd(l.price * l.n)}/mo</span></li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2" role="radiogroup" aria-label="Rental length">
                  {TERMS.map((t) => (
                    <button key={t.m} role="radio" aria-checked={t.m === term.m} onClick={() => setTerm(t)}
                      className={`flex-1 rounded-xl border-2 px-2 py-2 text-sm font-semibold ${t.m === term.m ? "border-jungle bg-jungle text-sand" : "border-jungle/30"}`}>
                      {t.m} {t.m === 1 ? "month" : "months"}{t.off > 0 && <><br /><span className="text-xs">save {t.off * 100}%</span></>}
                    </button>
                  ))}
                </div>
                <p className="mt-4 flex justify-between text-lg font-extrabold"><span>Total for {term.m} {term.m === 1 ? "month" : "months"}</span><span>{usd(total)}</span></p>
                <div className="mt-5 flex gap-3">
                  <button onClick={() => setOpen(false)} className="flex-1 rounded-full border-2 border-jungle py-3 font-bold">Keep editing</button>
                  <button onClick={() => setDone(true)} className="flex-1 rounded-full bg-coral py-3 font-bold text-white">Confirm rental</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Picker({ title, opts, value, onPick }: { title: string; opts: Opt[]; value: string; onPick: (id: string) => void }) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-bold">{title}</h2>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={title}>
        {opts.map((o) => (
          <button key={o.id} role="radio" aria-checked={o.id === value} onClick={() => onPick(o.id)}
            className={`rounded-xl p-3 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral ${o.id === value ? "bg-sand text-jungle" : "bg-moss hover:bg-moss/70"}`}>
            <span className="block font-bold leading-tight">{o.name}</span>
            <span className="block text-xs opacity-70">{o.note}</span>
            <span className="mt-1 block font-semibold">{usd(o.price)}/mo</span>
          </button>
        ))}
      </div>
    </div>
  );
}
