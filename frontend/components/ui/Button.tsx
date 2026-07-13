import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return clsx(
    "inline-flex items-center justify-center rounded-xl font-medium transition duration-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2",
    "active:scale-[0.98]",
    size === "sm" && "min-h-10 px-4 text-sm",
    size === "md" && "min-h-11 px-5 text-sm",
    size === "lg" && "min-h-12 px-6 text-base",
    variant === "primary" && "bg-accent text-white shadow-soft hover:-translate-y-0.5 hover:bg-accent2",
    variant === "secondary" && "bg-cocoa text-white shadow-soft hover:-translate-y-0.5 hover:opacity-95",
    variant === "ghost" && "border border-border bg-white/60 text-accent backdrop-blur-sm hover:bg-accentSoft",
    className,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props} />
  );
}