import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLayout } from '@/components/layout/AppLayout';
import { ArrowRight, Bot, DollarSign, Zap } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { AnimatedPage } from '@/components/AnimatedPage';
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
export function HomePage() {
  return (
    <AppLayout>
      <AnimatedPage>
        <div className="relative isolate overflow-hidden">
          <div
            className="absolute inset-0 -z-10 bg-background [background-image:radial-gradient(125%_125%_at_50%_10%,hsl(var(--card))_40%,hsl(var(--primary))_100%)] opacity-10"
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="py-24 md:py-32 lg:py-40 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground"
              >
                Vibe Estimate
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground"
              >
                An AI-Powered App Cost Calculator to instantly estimate development time, first-year costs, and monthly upkeep for any application idea.
              </motion.p>
              <motion.div variants={itemVariants} className="mt-10">
                <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/select-app">
                    Start Estimating
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="py-16 md:py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants}>
                <FeatureCard
                  icon={Zap}
                  title="AI-Powered Efficiency"
                  description="Leverage our 'Vibe Coding' model, which estimates a 75% reduction in development time compared to traditional methods."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard
                  icon={DollarSign}
                  title="Transparent Costs"
                  description="Get a detailed breakdown of one-time development costs and recurring monthly expenses for hosting, databases, and APIs."
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <FeatureCard
                  icon={Bot}
                  title="Intelligent Recommendations"
                  description="Receive a complete, tailored technology stack recommendation based on your application's specific requirements."
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedPage>
    </AppLayout>
  );
}
function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <Card className="bg-card border h-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="flex items-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}