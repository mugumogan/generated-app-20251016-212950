import { useDraggable } from '@dnd-kit/core';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Question } from '@/lib/data';
import { cn } from '@/lib/utils';
interface DraggableFeatureProps {
  feature: Question;
  isAdded: boolean;
  onToggle: (featureId: string, isAdded: boolean) => void;
}
export function DraggableFeature({ feature, isAdded, onToggle }: DraggableFeatureProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: feature.id,
    disabled: isAdded,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  const Icon = feature.icon;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className={cn(
        "p-3 transition-all duration-200",
        isAdded ? "bg-muted/50 opacity-50 cursor-not-allowed" : "cursor-grab hover:bg-accent hover:shadow-md active:cursor-grabbing",
        isDragging && "z-50 shadow-xl scale-105"
      )}>
        <div className="flex items-center gap-3">
          <div className="p-1">
            <Checkbox
              id={`checkbox-${feature.id}`}
              checked={isAdded}
              onCheckedChange={() => onToggle(feature.id, isAdded)}
            />
          </div>
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
          <label htmlFor={`checkbox-${feature.id}`} className={cn("text-sm font-medium", isAdded ? "cursor-not-allowed" : "cursor-grab")}>
            {feature.label}
          </label>
        </div>
      </Card>
    </div>
  );
}