import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEstimatorStore } from '@/store/estimator-store';
import { calculateEstimate } from '@/lib/calculator';
import { AnimatedCounter } from '@/components/AnimatedCounter';
export function RealtimeEstimate() {
  const selectedApp = useEstimatorStore((state) => state.selectedApp);
  const configuration = useEstimatorStore((state) => state.configuration);
  const selectedFeatures = useEstimatorStore((state) => state.selectedFeatures);
  // This is a derived value, so we calculate it here instead of storing it.
  const results = selectedApp ? calculateEstimate(selectedApp, configuration, selectedFeatures) : null;
  return (
    <Card className="bg-card border sticky top-24">
      <CardHeader>
        <CardTitle>Real-time Estimate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">First Year Cost</p>
          <p className="text-2xl font-bold text-primary">
            <AnimatedCounter value={results?.firstYearCost ?? 0} formatAsCurrency />
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Development Time</p>
          <p className="text-lg font-semibold">
            <AnimatedCounter value={results?.devTime[0] ?? 0} />-
            <AnimatedCounter value={results?.devTime[1] ?? 0} postfix=" weeks" />
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Monthly Recurring</p>
          <p className="text-lg font-semibold">
            <AnimatedCounter value={results?.monthlyCost ?? 0} formatAsCurrency postfix="/mo" />
          </p>
        </div>
      </CardContent>
    </Card>
  );
}