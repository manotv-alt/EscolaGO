"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, DollarSign, MapPin, Phone, Mail } from "lucide-react"
import { useEffect, useState } from "react"

interface SchoolData {
  id: string
  name: string
  city: string
  district: string
  address: string
  phone: string
  email: string
  ideb: number
  idebYear: number
  availableSlots: number
  totalStudents: number
  publicInvestment: number
  investmentYear: number
}

interface SchoolDashboardProps {
  school: SchoolData
}

export function SchoolDashboard({ school }: SchoolDashboardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getIdebColor = (ideb: number) => {
    if (ideb >= 6) return "text-primary"
    if (ideb >= 5) return "text-accent"
    return "text-destructive"
  }

  return (
    <div className="space-y-6">
      {/* School Header */}
      <div
        className={`bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 md:p-8 transition-all duration-1000 hover:shadow-2xl ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-balance">{school.name}</h1>
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 text-white/90 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="break-words">
              {school.address}, {school.district} - {school.city}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 text-white/90 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 flex-shrink-0" />
            <span>{school.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span className="break-all">{school.email}</span>
          </div>
        </div>
      </div>

      {/* Data Dashboard */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* IDEB Card */}
        <Card
          className={`border-2 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary active:scale-95 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold">IDEB</CardTitle>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`text-4xl sm:text-5xl font-bold mb-2 ${getIdebColor(school.ideb)} transition-all duration-300 hover:scale-110`}
            >
              {school.ideb.toFixed(1)}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              Índice de Desenvolvimento da Educação Básica
            </p>
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground">Ano de referência: {school.idebYear}</p>
              <p className="text-xs text-primary font-medium mt-1">Fonte: INEP</p>
            </div>
          </CardContent>
        </Card>

        {/* Available Slots Card */}
        <Card
          className={`border-2 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-secondary active:scale-95 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold">Vagas</CardTitle>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-secondary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl sm:text-5xl font-bold text-secondary mb-2 transition-all duration-300 hover:scale-110">
              {school.availableSlots}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">Vagas disponíveis para matrícula</p>
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground">
                Total de alunos: {school.totalStudents.toLocaleString("pt-BR")}
              </p>
              <p className="text-xs text-secondary font-medium mt-1">Fonte: Seduc-GO</p>
            </div>
          </CardContent>
        </Card>

        {/* Public Investment Card */}
        <Card
          className={`border-2 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-accent active:scale-95 sm:col-span-2 md:col-span-1 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold">Investimento</CardTitle>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-accent/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-2 transition-all duration-300 hover:scale-105 break-words">
              {formatCurrency(school.publicInvestment)}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">Investimento público total</p>
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground">Ano de referência: {school.investmentYear}</p>
              <p className="text-xs text-accent font-medium mt-1">Fonte: Portal da Transparência</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card
        className={`transition-all duration-1000 hover:shadow-lg ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "800ms" }}
      >
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Sobre os Dados</CardTitle>
          <p className="text-sm">Aqui você descobre o que cada informação significa e por que ela é importante para 
entender a sua escola.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="hover:bg-muted/50 p-3 rounded-lg transition-colors">
            <h4 className="font-semibold text-sm mb-2">IDEB (Índice de Desenvolvimento da Educação Básica)</h4>
            <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
              É a nota oficial de qualidade que o Ministério da Educação (MEC) dá para sua escola. 
O IDEB é calculado com duas informações principais: 
1. O quanto os alunos aprenderam nas provas de Português e Matemática. 
2. A taxa de progresso, ou seja, quantos alunos estão avançando sem reprovar. 
Quanto mais perto de 10, melhor a qualidade da escola. É o indicador mais importante 
para saber o desempenho da sua unidade!
            </p>
          </div>
          <div className="hover:bg-muted/50 p-3 rounded-lg transition-colors">
            <h4 className="font-semibold text-sm mb-2">Vagas Disponíveis</h4>
            <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
              Este é o número exato de vagas abertas para novos alunos ou estudantes que desejam 
se matricular na unidade escolar. É um dado importante para entender a capacidade de 
atendimento da escola e é atualizado diretamente pela Secretaria de Estado da Educação 
de Goiás (Seduc-GO).
            </p>
          </div>
          <div className="hover:bg-muted/50 p-3 rounded-lg transition-colors">
            <h4 className="font-semibold text-sm mb-2">Investimento Público</h4>
            <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
              Representa o valor total em dinheiro que o Governo de Goiás destina à sua escola. 
Este investimento cobre tudo o que a escola precisa para funcionar, como a manutenção 
da infraestrutura (quadras, salas de aula), a compra de recursos pedagógicos e outros 
custos. Este dado vem do Portal da Transparência, garantindo que você saiba como o 
dinheiro está sendo usado.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
