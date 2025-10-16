export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vibe Estimate. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ at Cloudflare
          </p>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground/60 space-y-2">
          <p>
            Disclaimer: All cost and time estimates are for informational purposes only and are not a guarantee. Actual costs may vary based on project scope, complexity, and other factors.
          </p>
          <p>
            AI capabilities are subject to usage limits across all user applications within a given time period.
          </p>
        </div>
      </div>
    </footer>
  );
}