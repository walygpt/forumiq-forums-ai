"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SearchResult {
  id: string
  title: string
  relevanceScore: number
  reason: string
}

export function SemanticSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setHasSearched(true)
    try {
      const response = await fetch("/api/ai/semantic-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error("Search failed:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <div className="p-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search by meaning: 'best ways to structure APIs', 'discussion about web performance', etc..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-input border-border text-foreground flex-1"
            />
            <Button type="submit" disabled={loading} className="gap-2 px-6">
              <Search className="w-4 h-4" />
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
            </Button>
          </form>
        </div>
      </Card>

      {/* Results */}
      {hasSearched && (
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 text-primary animate-spin mr-2" />
              <span className="text-muted-foreground">Searching by semantic meaning...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              {results.map((result) => (
                <Card key={result.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-foreground">{result.title}</h3>
                      <Badge variant="outline" className="text-primary">
                        {Math.round(result.relevanceScore * 100)}% match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{result.reason}</p>
                    <Button size="sm" variant="ghost" className="gap-2">
                      View Thread
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <div className="p-12 text-center">
                <p className="text-muted-foreground">No results found. Try a different search query.</p>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
