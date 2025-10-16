import { useDroppable } from '@dnd-kit/core';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEstimatorStore } from '@/store/estimator-store';
import { Question } from '@/lib/data';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
interface DropCanvasProps {
  appFeatures: Question[];
}
export function DropCanvas({ appFeatures }: DropCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas' });
  const { selectedFeatures, removeFeature, configuration, setConfiguration } = useEstimatorStore();
  const featuresOnCanvas = appFeatures.filter(f => selectedFeatures.includes(f.id));
  return (
    <Card
      ref={setNodeRef}
      className={cn(
        "bg-card border min-h-[400px] transition-colors duration-300",
        isOver ? "border-primary shadow-lg" : ""
      )}
    >
      <CardHeader>
        <CardTitle>Your Application Canvas</CardTitle>
        <CardDescription>Configure the features you've added to your project.</CardDescription>
      </CardHeader>
      <CardContent>
        {featuresOnCanvas.length === 0 ? (
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Drop features here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {featuresOnCanvas.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.id} className="p-4 border rounded-lg bg-background/50">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3 mb-3">
                      {Icon && <Icon className="h-6 w-6 text-primary" />}
                      <h3 className="text-lg font-semibold">{feature.label}</h3>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeFeature(feature.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {feature.type === 'select' && feature.options && (
                    <div>
                      <Label htmlFor={feature.id} className="text-xs text-muted-foreground">Provider</Label>
                      <Select
                        onValueChange={(v) => setConfiguration(feature.id, v)}
                        defaultValue={configuration[feature.id] ?? feature.defaultValue}
                      >
                        <SelectTrigger id={feature.id} className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {feature.options.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}