"use client"

import { SchoolSearch } from "@/components/school-search"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative bg-secondary text-secondary-foreground py-16 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-secondary/80 animate-gradient" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-balance transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-green-400 inline-block hover:scale-105 cursor-pointer transition-transform duration-300">
              Transparência
            </span>{" "}
            na educação pública de Goiás
          </h1>

          <p
            className={`text-base sm:text-lg md:text-xl mb-8 text-secondary-foreground/90 text-pretty transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Acesse, compare e entenda os dados 
completos sobre as escolas estaduais de Goiás: IDEB, vagas disponíveis e 
investimentos públicos, reunidos em uma única plataforma clara e acessível.
          </p>

          <div
            className={`max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SchoolSearch />
          </div>
        </div>
      </div>
    </section>
  )
}
