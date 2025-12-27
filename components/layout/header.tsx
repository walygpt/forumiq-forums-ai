"use client"

export function Header() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true"

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">ForumIQ</h1>
          <p className="text-sm text-muted-foreground">AI-Powered Forum Intelligence</p>
        </div>
        <div className="flex items-center gap-2">
          {isDemoMode && (
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/20">
              AI Demo Mode
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">Beta</span>
        </div>
      </div>
    </header>
  )
}
