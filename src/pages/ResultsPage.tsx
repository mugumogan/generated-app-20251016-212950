import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useEstimatorStore } from '@/store/estimator-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Home, RefreshCw, Share2, Camera, Info, X, CheckCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { AnimatedPage } from '@/components/AnimatedPage';
import { toast } from 'sonner';
import { decodeState, encodeState } from '@/lib/sharing';
import { ComparisonView } from '@/components/results/ComparisonView';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GanttChart } from '@/components/results/GanttChart';
import { CostBarChart } from '@/components/results/CostBarChart';
import { COST_BREAKDOWN_DESCRIPTIONS } from '@/lib/data';
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};
export function ResultsPage() {
  const { selectedApp, results, reset, configuration, selectedFeatures, hydrateFromState, comparisonResults, snapshotResults, clearComparison } = useEstimatorStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareableLink, setShareableLink] = useState('');
  useEffect(() => {
    const configParam = searchParams.get('config');
    if (configParam) {
      const decodedState = decodeState(configParam);
      if (decodedState) {
        hydrateFromState(decodedState);
      } else {
        toast.error("Invalid share link. Please start a new estimate.");
        navigate('/select-app');
      }
    }
  }, [searchParams, hydrateFromState, navigate]);
  useEffect(() => {
    const configParam = searchParams.get('config');
    if (!configParam && (!selectedApp || !results)) {
      navigate('/select-app');
    }
  }, [selectedApp, results, navigate, searchParams]);
  if (!selectedApp || !results) {
    return <AppLayout><div>Loading estimate...</div></AppLayout>;
  }
  const handleShare = async () => {
    if (!selectedApp) return;
    const shareableState = {
      appId: selectedApp.id,
      configuration,
      selectedFeatures
    };
    const encodedState = encodeState(shareableState);
    const url = new URL(window.location.href);
    url.search = `?config=${encodedState}`;
    const link = url.toString();
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Shareable link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      setShareableLink(link);
      setIsShareDialogOpen(true);
    }
  };
  const { costBreakdown, techStack, timeline, treemapData, featureSummary } = results;
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);
  return (
    <AppLayout>
      <AnimatedPage>
        <TooltipProvider>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16 md:py-24">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Your Vibe Estimate</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Here's the breakdown for your <span className="text-primary font-semibold">{selectedApp.name}</span> project.
                </p>
              </div>
              {comparisonResults ?
              <ComparisonView current={results} comparison={comparisonResults} /> :
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible">
                  <motion.div variants={itemVariants}>
                    <SummaryCard title="Total First Year Cost" value={formatCurrency(results.firstYearCost)} />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <SummaryCard title="Development Time" value={`${results.devTime[0]}-${results.devTime[1]} weeks`} />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <SummaryCard title="Monthly Recurring Cost" value={`${formatCurrency(results.monthlyCost)}/mo`} />
                  </motion.div>
                </motion.div>
              }
              <motion.div
                className="my-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                <Card className="bg-card border">
                  <CardHeader>
                    <CardTitle>Features Implemented</CardTitle>
                    <CardDescription>A high-level overview of your application's core deliverables.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {featureSummary.map((feature, index) =>
                      <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                className="my-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}>
                <CostBarChart data={treemapData} />
              </motion.div>
              <motion.div
                className="my-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}>
                <GanttChart data={timeline} />
              </motion.div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}>
                  <h2 className="text-2xl font-semibold mb-4">Cost Breakdown</h2>
                  <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-lg">Development Cost (One-Time)</AccordionTrigger>
                      <AccordionContent className="p-4 bg-muted/50 rounded-b-md">
                        <p className="text-muted-foreground mb-4">Total: {formatCurrency(costBreakdown.development.total)}</p>
                        <div className="space-y-4">
                          {costBreakdown.development.tasks.map((task) =>
                          <div key={task.id}>
                              <h4 className="font-semibold">{task.name} ({task.hours} hrs)</h4>
                              <p className="text-sm text-muted-foreground italic my-1">{task.description}</p>
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {task.deliverables.map((d, i) => <li key={i}>{d}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="mt-6 p-3 bg-primary/10 border border-primary/20 rounded-lg text-center">
                          <p className="font-semibold text-primary">AI Vibe Coding Efficiency: 75% time reduction applied</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Platform Cost</AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p className="font-semibold">{formatCurrency(costBreakdown.platform)}/month</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {COST_BREAKDOWN_DESCRIPTIONS.platform.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          Database Cost
                          <Tooltip>
                            <TooltipTrigger asChild><span><Info className="h-4 w-4 text-muted-foreground" /></span></TooltipTrigger>
                            <TooltipContent>Cost scaled based on expected monthly users.</TooltipContent>
                          </Tooltip>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p className="font-semibold">{formatCurrency(costBreakdown.database)}/month</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {COST_BREAKDOWN_DESCRIPTIONS.database.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          APIs & Services Cost
                          <Tooltip>
                            <TooltipTrigger asChild><span><Info className="h-4 w-4 text-muted-foreground" /></span></TooltipTrigger>
                            <TooltipContent>Usage-based services are scaled based on expected monthly users.</TooltipContent>
                          </Tooltip>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p className="font-semibold">{formatCurrency(costBreakdown.services)}/month</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {COST_BREAKDOWN_DESCRIPTIONS.services.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          Hosting Cost
                          <Tooltip>
                            <TooltipTrigger asChild><span><Info className="h-4 w-4 text-muted-foreground" /></span></TooltipTrigger>
                            <TooltipContent>Cost scaled based on expected monthly users.</TooltipContent>
                          </Tooltip>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <p className="font-semibold">{formatCurrency(costBreakdown.hosting)}/month</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {COST_BREAKDOWN_DESCRIPTIONS.hosting.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}>
                  <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
                  <Card className="bg-card border">
                    <CardContent className="p-6 space-y-4">
                      {techStack.map((stack) =>
                      <div key={stack.category}>
                          <h3 className="font-semibold mb-2">{stack.category}</h3>
                          <div className="flex flex-wrap gap-2">
                            {stack.items.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              <div className="mt-16 text-center flex flex-wrap justify-center gap-4">
                <Button variant="outline" onClick={() => navigate('/configure')}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Modify Estimate
                </Button>
                {comparisonResults ?
                <Button variant="destructive" onClick={clearComparison}>
                    <X className="mr-2 h-4 w-4" /> Reset Comparison
                  </Button> :
                <Button onClick={snapshotResults}>
                    <Camera className="mr-2 h-4 w-4" /> Snapshot for Comparison
                  </Button>
                }
                <Button onClick={handleShare} disabled={!!comparisonResults}>
                  <Share2 className="mr-2 h-4 w-4" /> Share Estimate
                </Button>
                <Button variant="ghost" onClick={() => {reset();navigate('/');}}>
                  <Home className="mr-2 h-4 w-4" /> Back to Home
                </Button>
              </div>
            </div>
          </div>
        </TooltipProvider>
        <AlertDialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Copy Shareable Link</AlertDialogTitle>
              <AlertDialogDescription>
                Automatic copying failed. Please copy the link below manually.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-2">
              <Label htmlFor="share-link" className="sr-only">Share Link</Label>
              <Input id="share-link" value={shareableLink} readOnly />
            </div>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setIsShareDialogOpen(false)}>Done</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AnimatedPage>
    </AppLayout>
  );
}
function SummaryCard({ title, value }: {title: string;value: string;}) {
  return (
    <Card className="bg-card border text-center h-full">
      <CardHeader>
        <CardTitle className="text-muted-foreground font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  );
}