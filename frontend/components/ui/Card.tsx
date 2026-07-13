import clsx from "clsx";

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-border bg-surface p-6 shadow-soft transition duration-300",
        interactive && "hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(27,113,63,0.16)]",
        className,
      )}
    >
      {children}
    </div>
  );
}