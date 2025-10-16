import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { AppLayout } from '@/components/layout/AppLayout';
import { useEstimatorStore } from '@/store/estimator-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { commonQuestions, Question } from '@/lib/data';
import { AnimatedPage } from '@/components/AnimatedPage';
import { FeaturePalette } from '@/components/configure/FeaturePalette';
import { DropCanvas } from '@/components/configure/DropCanvas';
import { RealtimeEstimate } from '@/components/configure/RealtimeEstimate';
export function ConfigurePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedApp, selectApp, configuration, setConfiguration, calculateResults, addFeature } = useEstimatorStore();
  const [isLoading, setIsLoading] = useState(false);
  const appType = searchParams.get('type');
  useEffect(() => {
    if (appType) {
      if (!selectedApp || selectedApp.id !== appType) {
        selectApp(appType);
      }
    } else if (!selectedApp) {
      navigate('/select-app');
    }
  }, [appType, selectedApp, selectApp, navigate]);
  if (!selectedApp) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-2xl font-bold">Loading app configuration...</h1>
          <p className="mt-4 text-muted-foreground">
            If you are not redirected, please <Link to="/select-app" className="text-primary underline">select an app type</Link>.
          </p>
        </div>
      </AppLayout>
    );
  }
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'canvas') {
      addFeature(event.active.id as string);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      calculateResults();
      setIsLoading(false);
      navigate('/results');
    }, 500);
  };
  const renderQuestion = (q: Question) => {
    const value = configuration[q.id] ?? q.defaultValue;
    switch (q.type) {
      case 'select':
        return (
          <div key={q.id}>
            <Label htmlFor={q.id}>{q.label}</Label>
            <Select onValueChange={(v) => setConfiguration(q.id, v)} defaultValue={value}>
              <SelectTrigger id={q.id}><SelectValue /></SelectTrigger>
              <SelectContent>
                {q.options?.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        );
      case 'slider':
        return (
          <div key={q.id}>
            <Label htmlFor={q.id}>{q.label}</Label>
            <Slider
              id={q.id}
              min={q.min}
              max={q.max}
              step={q.step}
              defaultValue={[value]}
              onValueChange={([v]) => setConfiguration(q.id, v)}
            />
            <p className="text-sm text-muted-foreground text-right mt-2">
              {value} {q.unit}
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <AppLayout>
      <AnimatedPage>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16 md:py-24">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Configure Your App</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Fine-tune the details for your <span className="text-primary font-semibold">{selectedApp.name}</span> to get a precise estimate.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <Card className="bg-card border">
                  <CardHeader>
                    <CardTitle>Core Configuration</CardTitle>
                    <CardDescription>These settings apply to most application types.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {commonQuestions.slice(0, 4).map(renderQuestion)}
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-1 space-y-8">
                    <FeaturePalette availableFeatures={selectedApp.questions} />
                    <RealtimeEstimate />
                  </div>
                  <div className="lg:col-span-2">
                    <DropCanvas appFeatures={selectedApp.questions} />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-6">
                  <Button variant="outline" asChild>
                    <Link to="/select-app"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
                  </Button>
                  <Button type="submit" className="group" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        Finalize Estimate <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DndContext>
      </AnimatedPage>
    </AppLayout>
  );
}