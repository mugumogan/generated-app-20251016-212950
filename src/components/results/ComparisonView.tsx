import { CalculationResults } from "@/lib/calculator";
import { ComparisonCard } from "./ComparisonCard";
interface ComparisonViewProps {
  current: CalculationResults;
  comparison: CalculationResults;
}
export function ComparisonView({ current, comparison }: ComparisonViewProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Estimate Comparison</h2>
        <p className="text-muted-foreground">Comparing your current configuration against the snapshot.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ComparisonCard
          title="First Year Cost"
          currentValue={current.firstYearCost}
          comparisonValue={comparison.firstYearCost}
          formatAsCurrency
        />
        <ComparisonCard
          title="Development Time"
          currentValue={current.devTime[1]}
          comparisonValue={comparison.devTime[1]}
          postfix=" weeks"
          isTimeRange
          currentRange={current.devTime}
          comparisonRange={comparison.devTime}
        />
        <ComparisonCard
          title="Monthly Recurring"
          currentValue={current.monthlyCost}
          comparisonValue={comparison.monthlyCost}
          formatAsCurrency
          postfix="/mo"
        />
      </div>
    </div>
  );
}