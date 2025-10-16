import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/lib/data';
import { useEstimatorStore } from '@/store/estimator-store';
import { DraggableFeature } from './DraggableFeature';
interface FeaturePaletteProps {
  availableFeatures: Question[];
}
export function FeaturePalette({ availableFeatures }: FeaturePaletteProps) {
  const selectedFeatures = useEstimatorStore((state) => state.selectedFeatures);
  const addFeature = useEstimatorStore((state) => state.addFeature);
  const removeFeature = useEstimatorStore((state) => state.removeFeature);
  const handleToggle = (featureId: string, isCurrentlyAdded: boolean) => {
    if (isCurrentlyAdded) {
      removeFeature(featureId);
    } else {
      addFeature(featureId);
    }
  };
  return (
    <Card className="bg-card border h-full">
      <CardHeader>
        <CardTitle>Feature Palette</CardTitle>
        <CardDescription>Drag or click features to add them to your app.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {availableFeatures.map((feature) => (
          <DraggableFeature
            key={feature.id}
            feature={feature}
            isAdded={selectedFeatures.includes(feature.id)}
            onToggle={handleToggle}
          />
        ))}
      </CardContent>
    </Card>
  );
}