import * as React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10",
    secondary: "border-slate-800 bg-slate-900/80 text-slate-300",
    cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.15)]",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.15)]",
    destructive: "border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.15)]",
    outline: "text-slate-200 border-white/20 bg-transparent hover:bg-white/5"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-mono font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
