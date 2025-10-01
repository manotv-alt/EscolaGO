"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Database, Users, Shield } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function AboutPage() {
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

  const goals = [
    {
      icon: Target,
      title: "Transparência Total",
      description: "Fornecer acesso fácil e transparente a dados educacionais públicos do estado de Goiás.",
    },
    {
      icon: Database,
      title: "Dados Confiáveis",
      description: "Utilizar apenas fontes oficiais como INEP, Seduc-GO e Portal da Transparência.",
    },
    {
      icon: Users,
      title: "Acesso Universal",
      description: "Democratizar o acesso à informação para pais, estudantes e toda a comunidade.",
    },
    {
      icon: Shield,
      title: "Compromisso Público",
      description: "Promover a accountability e melhorar a qualidade da educação pública.",
    },
  ]

  const dataSources = [
    {
      name: "INEP",
      fullName: "Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira",
      description: "Fornece os dados do IDEB (Índice de Desenvolvimento da Educação Básica).",
      url: "https://www.gov.br/inep/",
    },
    {
      name: "Seduc-GO",
      fullName: "Secretaria de Estado da Educação de Goiás",
      description: "Disponibiliza informações sobre vagas e matrículas nas escolas estaduais.",
      url: "https://www.educacao.go.gov.br/",
    },
    {
      name: "Portal da Transparência",
      fullName: "Portal da Transparência do Governo de Goiás",
      description: "Apresenta dados sobre investimentos públicos em cada unidade escolar.",
      url: "https://www.transparencia.go.gov.br/",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-16 md:py-24 animate-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Sobre o Projeto
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 text-pretty animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                EscolaGO! é uma plataforma de transparência e dados abertos criada para a rede 
estadual de ensino de Goiás. Nosso objetivo é resolver o problema da falta de acesso, 
transformando dados complexos, como notas do IDEB e investimentos públicos, em 
conhecimento claro e fácil para os alunos.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={sectionRef} className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Nossa Missão
                <p className="text-base mt-3 font-normal">EscolaGO! é uma plataforma de transparência e dados abertos criada para a rede 
estadual de ensino de Goiás. Nosso objetivo é resolver o problema da falta de acesso, 
transformando dados complexos, como notas do IDEB e investimentos públicos, em 
conhecimento claro e fácil para os alunos. 
                </p>
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {goals.map((goal, index) => {
                  const Icon = goal.icon
                  return (
                    <Card
                      key={index}
                      className={`border-2 hover:border-primary hover:shadow-xl transition-all duration-500 hover:scale-105 active:scale-95 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 hover:rotate-12">
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">{goal.title}</h3>
                            <p className="text-sm sm:text-base text-muted-foreground text-pretty">{goal.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Fontes de Dados</h2>
              <p className="text-center text-sm sm:text-base text-muted-foreground mb-12 text-pretty px-4">
                Todos os dados apresentados são obtidos de fontes oficiais e confiáveis
              </p>
              <div className="space-y-4 sm:space-y-6">
                {dataSources.map((source, index) => (
                  <Card
                    key={index}
                    className="border-2 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-100"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">{source.name}</h3>
                          <p className="text-xs sm:text-sm font-medium text-foreground mb-2">{source.fullName}</p>
                          <p className="text-sm sm:text-base text-muted-foreground text-pretty">{source.description}</p>
                        </div>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline font-medium transition-all hover:scale-105 active:scale-95 inline-block"
                        >
                          Visitar site →
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">Como Funciona</h2>
              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    number: "1",
                    title: "Busque a Escola",
                    description:
                      "Use a barra de busca na página inicial para encontrar qualquer escola da rede estadual de Goiás pelo nome ou localização.",
                  },
                  {
                    number: "2",
                    title: "Visualize os Dados",
                    description:
                      "Acesse o painel de dados da escola com informações sobre IDEB, vagas disponíveis e investimento público.",
                  },
                  {
                    number: "3",
                    title: "Tome Decisões Informadas",
                    description:
                      "Use as informações para escolher a melhor escola, acompanhar o desempenho educacional e cobrar melhorias.",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex gap-4 hover:translate-x-2 transition-transform duration-300">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground text-pretty">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
