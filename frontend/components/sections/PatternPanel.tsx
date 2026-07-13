import clsx from "clsx";

export function PatternPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={clsx(
        "relative overflow-hidden rounded-xl border border-border p-6 md:p-10",
        "bg-surface shadow-soft",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70 motif-overlay" aria-hidden />
      <div className="relative">{children}</div>
    </section>
  );
}