import { cn } from "@/lib/utils";

interface ListGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
  flush?: boolean;
  horizontal?: boolean;
}

function ListGroup({ className, flush = false, horizontal = false, ...props }: ListGroupProps) {
  return (
    <ul
      data-slot="list-group"
      className={cn(
        "flex",
        horizontal ? "flex-row" : "flex-col",
        !flush && "rounded-xl border border-border overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

interface ListGroupItemProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  active?: boolean;
  disabled?: boolean;
  as?: any;
}

function ListGroupItem({
  className,
  active = false,
  disabled = false,
  as: Tag = "li",
  ...props
}: ListGroupItemProps) {
  return (
    <Tag
      data-slot="list-group-item"
      aria-disabled={disabled || undefined}
      className={cn(
        "relative px-4 py-3 text-sm border-b border-border last:border-b-0",
        "flex items-center gap-3",
        active
          ? "bg-primary text-primary-foreground font-medium z-10"
          : "bg-card text-foreground",
        disabled
          ? "opacity-50 pointer-events-none text-muted-foreground"
          : !active && "hover:bg-muted transition-colors",
        Tag === "a" || Tag === "button"
          ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary/30"
          : "",
        className
      )}
      {...props}
    />
  );
}

interface ListGroupItemActionProps extends ListGroupItemProps {}

function ListGroupItemAction({ className, ...props }: ListGroupItemActionProps) {
  return (
    <ListGroupItem
      as="a"
      className={cn("cursor-pointer", className)}
      {...props}
    />
  );
}

export { ListGroup, ListGroupItem, ListGroupItemAction };
