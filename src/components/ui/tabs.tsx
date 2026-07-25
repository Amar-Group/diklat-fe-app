"use client";

import { useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

const TabsContext = createContext<any>(null);

interface TabsProps {
  defaultValue?: string;
  children?: React.ReactNode;
  className?: string;
  onChange?: (val: string) => void;
}

function Tabs({ defaultValue, children, className, onChange }: TabsProps) {
  const [active, setActive] = useState(defaultValue);

  const handleChange = (val) => {
    setActive(val);
    onChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ active, setActive: handleChange }}>
      <div data-slot="tabs" className={cn("w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  children?: any;
  className?: string;
  variant?: any;
}

function TabList({ children, className, variant = "line" }: TabListProps) {
  const variantClasses: Record<string, string> = {
    line: "border-b border-border gap-0",
    pill: "gap-1 p-1 bg-muted rounded-xl w-fit",
    boxed: "border border-border rounded-t-xl overflow-hidden gap-0 divide-x divide-border",
    underline: "gap-4 border-b border-border",
    vertical: "flex-col border-r border-border gap-0 w-fit",
  };

  return (
    <div
      data-slot="tab-list"
      role="tablist"
      className={cn("flex items-center", variantClasses[variant] || variantClasses.line, className)}
      data-variant={variant}
    >
      {Array.isArray(children)
        ? children.map((child: any) =>
            child
              ? { ...child, props: { ...child.props, _variant: variant } }
              : child
          )
        : children}
    </div>
  );
}

interface TabProps {
  value?: string;
  children?: React.ReactNode;
  icon?: any;
  disabled?: boolean;
  _variant?: any;
  className?: string;
}

function Tab({ value, children, icon: Icon, disabled = false, _variant = "line", className }: TabProps) {
  const { active, setActive } = useContext(TabsContext);
  const isActive = active === value;

  const variantClasses = {
    line: cn(
      "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
      isActive
        ? "border-primary text-primary"
        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
    ),
    pill: cn(
      "px-4 py-1.5 text-sm font-medium rounded-lg transition-colors",
      isActive
        ? "bg-card text-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground"
    ),
    boxed: cn(
      "px-4 py-2.5 text-sm font-medium transition-colors",
      isActive
        ? "bg-primary text-primary-foreground"
        : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
    ),
    underline: cn(
      "pb-2.5 text-sm font-medium border-b-2 transition-colors",
      isActive
        ? "border-primary text-primary"
        : "border-transparent text-muted-foreground hover:text-foreground"
    ),
    vertical: cn(
      "px-4 py-2.5 text-sm font-medium border-r-2 -mr-px transition-colors w-full text-left",
      isActive
        ? "border-primary text-primary bg-blue-50"
        : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted"
    ),
  };

  return (
    <button
      data-slot="tab"
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      disabled={disabled}
      onClick={() => !disabled && setActive(value)}
      className={cn(
        "inline-flex items-center gap-2 focus:outline-none select-none",
        "disabled:pointer-events-none disabled:opacity-40",
        variantClasses[_variant] || variantClasses.line,
        className
      )}
    >
      {Icon && <Icon className="size-4" />}
      {children}
    </button>
  );
}

interface TabPanelProps {
  value?: string;
  children?: React.ReactNode;
  className?: string;
}

function TabPanel({ value, children, className }: TabPanelProps) {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;

  return (
    <div
      data-slot="tab-panel"
      role="tabpanel"
      id={`panel-${value}`}
      className={cn("mt-4 text-sm text-foreground", className)}
    >
      {children}
    </div>
  );
}

export { Tabs, TabList, Tab, TabPanel };
