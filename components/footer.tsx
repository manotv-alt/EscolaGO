"use client"

import Link from "next/link"
import { Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="z-50 border-t w-full text-center bg-primary text-primary-foreground shadow-md">
      <div className="border-b flex-col py-4 mx-16 sm:py-0 sm:flex-row flex sm:h-16 items-center justify-between px-4">
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

        <p className="text-sm">
            Mantido por <a href="https://www.linkedin.com/in/emmanuel-fernandes-a04646289/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="hover:text-secondary" target="_blank" rel="noopener noreferrer">Emmanuel F. Castro </a>
            & <a href="https://www.linkedin.com/in/gabrielly-fonceca?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="hover:text-secondary" target="_blank" rel="noopener noreferrer">Gabrielly P. Fonceca</a>
        </p>

      </div>

      <p className="text-sm py-4">
        &copy; {new Date().getFullYear()} EscolaGO! All rights reserved.
      </p>        
    </footer>
  )
}
