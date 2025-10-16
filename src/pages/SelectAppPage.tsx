import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppLayout } from '@/components/layout/AppLayout';
import { appCategories } from '@/lib/data';
import { useEstimatorStore } from '@/store/estimator-store';
import { cn } from '@/lib/utils';
import { motion, Variants } from 'framer-motion';
import { AnimatedPage } from '@/components/AnimatedPage';
import { AISuggestionBox } from '@/components/select/AISuggestionBox';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
interface AIResult {
  appId: string;
  features: string[];
}
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
export function SelectAppPage() {
  const selectApp = useEstimatorStore((state) => state.selectApp);
  const navigate = useNavigate();
  const [suggestedAppId, setSuggestedAppId] = useState<string | null>(null);
  const [filteredCategoryNames, setFilteredCategoryNames] = useState<string[] | null>(null);
  const handleManualSelect = (appId: string) => {
    selectApp(appId);
    navigate(`/configure?type=${appId}`);
  };
  const handleAISelect = (result: AIResult) => {
    selectApp(result.appId, result.features);
    navigate(`/configure?type=${result.appId}`);
  };
  const handleSuggestion = (appId: string) => {
    setSuggestedAppId(appId);
    const suggestedAppCategory = appCategories.find(cat => cat.apps.some(app => app.id === appId));
    if (suggestedAppCategory) {
      const related = suggestedAppCategory.relatedCategories || [];
      setFilteredCategoryNames([suggestedAppCategory.name, ...related]);
    }
    const element = document.getElementById(`app-card-${appId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  const clearFilter = () => {
    setFilteredCategoryNames(null);
    setSuggestedAppId(null);
  };
  const complexityColors = {
    Low: 'bg-green-500/10 text-green-700 border-green-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20',
    High: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
    'Very High': 'bg-red-500/10 text-red-700 border-red-500/20',
  };
  const displayedCategories = filteredCategoryNames
    ? appCategories.filter(cat => filteredCategoryNames.includes(cat.name))
    : appCategories;
  return (
    <AppLayout>
      <AnimatedPage>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 md:py-24">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Select Your App Type</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose a template that best matches your vision, or let our AI suggest one for you.
              </p>
            </div>
            <AISuggestionBox onSuggestion={handleSuggestion} onSelect={handleAISelect} />
            <div className="space-y-12">
              {filteredCategoryNames && (
                <div className="text-center">
                  <Button variant="outline" onClick={clearFilter}>
                    <X className="mr-2 h-4 w-4" />
                    Clear Filter & Show All Categories
                  </Button>
                </div>
              )}
              {displayedCategories.map((category) => (
                <div key={category.name}>
                  <h2 className="text-2xl font-semibold tracking-tight mb-6">{category.name}</h2>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {category.apps.map((app) => (
                      <motion.div key={app.id} variants={itemVariants} id={`app-card-${app.id}`}>
                        <Card
                          onClick={() => handleManualSelect(app.id)}
                          className={cn(
                            "bg-card border cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1 h-full",
                            suggestedAppId === app.id && "ring-2 ring-primary shadow-glow"
                          )}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                                <app.icon className="h-7 w-7 text-primary" />
                              </div>
                              <Badge variant="outline" className={cn("whitespace-nowrap", complexityColors[app.complexity])}>
                                {app.complexity}
                              </Badge>
                            </div>
                            <CardTitle className="pt-4">{app.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>{app.description}</CardDescription>
                            <p className="text-sm text-muted-foreground mt-4">
                              Est. Dev Time: {app.devTime[0]}-{app.devTime[1]} weeks
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedPage>
    </AppLayout>
  );
}