import * as React from "react";
import { cn } from "../../lib/utils";

const Tabs = ({ value, onValueChange, className, children, ...props }) => {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { activeValue: value, onValueChange });
      })}
    </div>
  );
};

const TabsList = ({ className, children, activeValue, onValueChange, ...props }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-2xl bg-slate-950/70 p-1.5 border border-white/10 text-slate-400 backdrop-blur-xl",
        className
      )}
      {...props}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          isSelected: child.props.value === activeValue,
          onClick: () => onValueChange && onValueChange(child.props.value)
        });
      })}
    </div>
  );
};

const TabsTrigger = ({ className, isSelected, children, onClick, ...props }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none",
        isSelected
          ? "bg-white/10 text-white shadow-sm border border-white/15"
          : "text-slate-400 hover:text-slate-200 hover:bg-white/5",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, activeValue, className, children, ...props }) => {
  if (value !== activeValue) return null;
  return (
    <div
      className={cn("mt-4 ring-offset-background focus-visible:outline-none animate-fade-in", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
