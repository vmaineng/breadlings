import { cn } from "../lib/utils";
import { forwardRef } from "react";

// ─── Button ─────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      children,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const base =
      "inline-flex items-center justify-center font-fraunces font-bold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-gradient-to-r from-crust-light to-crust text-cream shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
      secondary:
        "bg-gradient-to-r from-wheat to-dough-dark text-crust border border-wheat-deep/30 hover:-translate-y-0.5",
      ghost: "bg-dough/60 text-crust border border-wheat/50 hover:bg-dough",
      danger: "bg-bread-red text-white hover:bg-red-600",
    };

    const sizes: Record<ButtonSize, string> = {
      sm: "text-sm px-4 py-2",
      md: "text-base px-6 py-3",
      lg: "text-lg px-8 py-3.5 w-full",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? <span className="mr-2 animate-spin">⏳</span> : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

// ─── Input ───────────────────────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-extrabold text-text-light uppercase tracking-wide font-nunito"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "bg-[#fef8ed] border border-wheat-deep/30 rounded-xl px-3.5 py-2.5",
          "font-nunito font-semibold text-sm text-crust",
          "outline-none transition-all duration-200",
          "focus:border-wheat-deep focus:ring-2 focus:ring-wheat-deep/15",
          "placeholder:text-text-light/50",
          error &&
            "border-bread-red focus:border-bread-red focus:ring-bread-red/15",
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs font-bold text-bread-red font-nunito">{error}</p>
      )}
    </div>
  ),
);
Input.displayName = "Input";

// ─── Textarea ────────────────────────────────────────────────────────────────

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-extrabold text-text-light uppercase tracking-wide font-nunito"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn(
          "bg-[#fef8ed] border border-wheat-deep/30 rounded-xl px-3.5 py-2.5 resize-y min-h-[80px]",
          "font-nunito font-semibold text-sm text-crust",
          "outline-none transition-all duration-200",
          "focus:border-wheat-deep focus:ring-2 focus:ring-wheat-deep/15",
          "placeholder:text-text-light/50",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
Textarea.displayName = "Textarea";

// ─── Card ────────────────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export function Card({ children, className, accent }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[#FFFBF3] rounded-3xl p-6 shadow-md border border-wheat/50",
        "relative overflow-hidden",
        accent &&
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-gradient-to-r after:from-wheat after:via-crust-light after:to-wheat-deep",
        className,
      )}
    >
      {children}
    </div>
  );
}
