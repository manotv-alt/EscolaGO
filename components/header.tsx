"use client"

import Link from "next/link"
import { Search, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg md:text-xl transition-transform hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-sm font-bold"><Globe /></span>
            </div>
            <span className="hidden sm:inline">EscolaGO!</span>
            <span className="sm:hidden">EscolaGO!</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4 transition-all hover:scale-110"
          >
            Início
          </Link>
          <Link
            href="/sobre"
            className="text-sm font-medium hover:underline underline-offset-4 transition-all hover:scale-110"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className="text-sm font-medium hover:underline underline-offset-4 transition-all hover:scale-110"
          >
            Contato
          </Link>
        </nav>

        <Link
          href="/"
          className="hidden md:flex items-center py-1 px-2 justify-center rounded-md bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all hover:scale-105 hover:shadow-lg"
        >
          <Search className="h-4 w-4 mr-2" />
          Buscar Escola
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-primary-foreground/10 rounded-lg transition-all active:scale-95"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 transition-transform rotate-90" />
          ) : (
            <Menu className="h-6 w-6 transition-transform" />
          )}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-3 bg-primary/95 backdrop-blur-sm">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-3 px-4 hover:bg-primary-foreground/10 rounded-lg transition-all active:scale-95"
          >
            Início
          </Link>
          <Link
            href="/sobre"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-3 px-4 hover:bg-primary-foreground/10 rounded-lg transition-all active:scale-95"
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium py-3 px-4 hover:bg-primary-foreground/10 rounded-lg transition-all active:scale-95"
          >
            Contato
          </Link>
          <Link
            href="/"
            className="bg-primary-foreground flex items-center justify-center rounded-lg text-primary hover:bg-primary-foreground/90 transition-all active:scale-95"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Search className="h-4 w-4 mr-2" />
            Buscar Escola
          </Link>
        </nav>
      </div>
    </header>
  )
}
