import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Vibe Estimate
            </span>
          </Link>
          <nav>
            {/* Future navigation links can go here */}
          </nav>
        </div>
      </div>
    </header>
  );
}