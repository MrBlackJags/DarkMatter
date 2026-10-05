import * as React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", disabled, ...props }, ref) => {
    const variants = {
      default: "bg-white text-slate-950 hover:bg-slate-200 shadow-sm font-medium",
      primary: "bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
      secondary: "bg-slate-900 border border-white/10 text-slate-200 hover:bg-slate-800 hover:text-white",
      outline: "border border-white/15 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/30",
      ghost: "text-slate-400 hover:bg-white/5 hover:text-white",
      cyan: "border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.15)]",
      amber: "border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
      emerald: "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
      destructive: "border border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
    };

    const sizes = {
      default: "h-9 px-4 py-2 text-xs",
      sm: "h-7 rounded-lg px-2.5 text-[11px]",
      lg: "h-11 rounded-xl px-6 text-sm",
      icon: "h-8 w-8 p-0"
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-mono text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-40 cursor-pointer active:scale-[0.98]",
          variants[variant] || variants.default,
          sizes[size] || sizes.default,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
