import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
interface ComparisonCardProps {
  title: string;
  currentValue: number;
  comparisonValue: number;
  formatAsCurrency?: boolean;
  postfix?: string;
  isTimeRange?: boolean;
  currentRange?: [number, number];
  comparisonRange?: [number, number];
}
export function ComparisonCard({
  title,
  currentValue,
  comparisonValue,
  formatAsCurrency = false,
  postfix = "",
  isTimeRange = false,
  currentRange,
  comparisonRange,
}: ComparisonCardProps) {
  const diff = currentValue - comparisonValue;
  const formatValue = (val: number) => {
    if (formatAsCurrency) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(val);
    }
    return val.toLocaleString();
  };
  const renderValue = (range?: [number, number], value?: number) => {
    if (isTimeRange && range) {
      return `${range[0]}-${range[1]}${postfix}`;
    }
    return `${formatValue(value ?? 0)}${postfix}`;
  };
  const diffColor = diff > 0 ? "text-red-600" : diff < 0 ? "text-green-600" : "text-muted-foreground";
  const DiffIcon = diff > 0 ? ArrowUp : diff < 0 ? ArrowDown : Minus;
  return (
    <Card className="bg-card border">
      <CardHeader>
        <CardTitle className="text-muted-foreground font-medium text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-4">
          <p className="text-xs text-muted-foreground">Current</p>
          <p className="text-2xl font-bold text-primary">{renderValue(currentRange, currentValue)}</p>
        </div>
        <div className="mb-4">
          <p className="text-xs text-muted-foreground">Snapshot</p>
          <p className="text-lg font-semibold text-muted-foreground">{renderValue(comparisonRange, comparisonValue)}</p>
        </div>
        <div className={cn("flex items-center justify-center gap-1 font-semibold", diffColor)}>
          <DiffIcon className="h-4 w-4" />
          <span>{renderValue(undefined, Math.abs(diff))}</span>
        </div>
      </CardContent>
    </Card>
  );
}