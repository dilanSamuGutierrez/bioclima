"use client";

export default function Marquee({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <div className="animate-marquee flex w-max items-center gap-10 py-4">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap text-sm font-medium uppercase tracking-[0.25em] text-steel"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-electric/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
