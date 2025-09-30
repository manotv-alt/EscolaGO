"use client"

import { BarChart3, Users, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

export function InfoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: BarChart3,
      title: "IDEB",
      description: "Índice de Desenvolvimento da Educação Básica de cada escola",
      source: "Fonte: INEP",
      color: "primary",
    },
    {
      icon: Users,
      title: "Vagas Disponíveis",
      description: "Número atual de vagas em cada unidade escolar",
      source: "Fonte: Seduc-GO",
      color: "secondary",
    },
    {
      icon: DollarSign,
      title: "Investimento Público",
      description: "Valor total de investimento público por escola",
      source: "Fonte: Portal da Transparência",
      color: "accent",
    },
  ]

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Dados transparentes e acessíveis
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty px-4">
            Todas as informações são obtidas de fontes oficiais e atualizadas regularmente para garantir precisão e
            confiabilidade.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`border-2 hover:border-${feature.color} transition-all duration-500 hover:shadow-xl hover:scale-105 active:scale-95 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-${feature.color}/10 flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110 hover:rotate-12`}
                    >
                      <Icon className={`h-7 w-7 sm:h-8 sm:w-8 text-${feature.color}`} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 text-pretty px-2">
                      {feature.description}
                    </p>
                    <p className={`text-xs sm:text-sm text-${feature.color} font-medium`}>{feature.source}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
