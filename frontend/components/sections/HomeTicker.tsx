export function HomeTicker({ className }: { className?: string }) {
  const items = [
    "Udaipur-only delivery",
    "Fresh weekly drops",
    "Small-batch chocolate",
    "Clean-label cereals",
    "No unnecessary fillers",
  ];

  const sequence = [...items, ...items];

  return (
    <section className={className} aria-label="Brand highlights">
      <div className="site-shell mb-2">
        <div className="overflow-hidden rounded-xl border border-border bg-white/80 py-3 shadow-soft">
          <div className="flex w-max animate-marquee">
            {sequence.map((item, index) => (
              <span key={`${item}-${index}`} className="mx-5 inline-flex items-center gap-5 text-sm font-medium text-cocoa">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
