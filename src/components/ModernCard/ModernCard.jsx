import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ModernCard({
  children,
  className,
  variant = "glass",
  hover = true,
}) {
  const variants = {
    glass:
      "bg-gradient-glass backdrop-blur-xl border border-white/20 shadow-glass",
    solid: "bg-white shadow-medium border-0",
    gradient: "bg-gradient-secondary shadow-strong border-0",
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-500",
        variants[variant],
        hover && "hover:shadow-strong hover:scale-[1.02] hover:-translate-y-1",
        className
      )}
    >
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  );
}
