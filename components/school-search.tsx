"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { searchSchools, type School } from "@/lib/db"

export function SchoolSearch() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<School[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    async function performSearch() {
      if (query.length > 2) {
        setIsLoading(true)
        const results = await searchSchools(query)
        setSuggestions(results.slice(0, 6))
        setIsOpen(true)
        setIsLoading(false)
      } else {
        setSuggestions([])
        setIsOpen(false)
      }
      setSelectedIndex(-1)
    }

    const debounceTimer = setTimeout(performSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0) {
        handleSelectSchool(suggestions[selectedIndex])
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const handleSelectSchool = (school: School) => {
    setQuery(school.name)
    setIsOpen(false)
    router.push(`/escola/${school.id}`)
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="flex flex-col sm:flex-row gap-2 bg-background rounded-lg p-2 sm:p-2 shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-colors" />
          <Input
            type="text"
            placeholder="Digite o nome da escola..."
            className="pl-9 sm:pl-10 border-0 focus-visible:ring-0 h-11 sm:h-12 text-sm sm:text-base text-foreground transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length > 2 && setIsOpen(true)}
          />
        </div>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105 active:scale-95 h-11 sm:h-12 text-sm sm:text-base"
          onClick={() => selectedIndex >= 0 && handleSelectSchool(suggestions[selectedIndex])}
        >
          Buscar
        </Button>
      </div>

      {isOpen && isLoading && (
        <div className="absolute top-full mt-2 w-full bg-background border rounded-lg shadow-xl z-50 p-4 text-center text-muted-foreground animate-in fade-in duration-200">
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2" />
          Buscando...
        </div>
      )}

      {isOpen && !isLoading && suggestions.length > 0 && (
        <div className="absolute max-h-54 top-full mt-2 w-full bg-background border rounded-lg shadow-xl z-50 overflow-y-auto animate-in slide-in-from-top-2 duration-300">
          {suggestions.map((school, index) => (
            <button
              key={school.id}
              className={`w-full text-left px-4 py-3 hover:bg-muted transition-all duration-200 border-b last:border-b-0 active:scale-[0.98] ${
                index === selectedIndex ? "bg-muted" : ""
              }`}
              onClick={() => handleSelectSchool(school)}
            >
              <div className="font-medium text-foreground text-sm sm:text-base">{school.name}</div>
              <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">
                  {school.city} - {school.district}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && !isLoading && query.length > 2 && suggestions.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-background border rounded-lg shadow-xl z-50 p-4 text-center text-muted-foreground animate-in fade-in duration-200 text-sm sm:text-base">
          Nenhuma escola encontrada
        </div>
      )}
    </div>
  )
}
