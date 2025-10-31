"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, MapPin, Mail, Briefcase } from "lucide-react"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { School } from "@/lib/db";

function getIdebSeries(school: any, etapa: "f" | "i" | "m") {
  const anos = [2005, 2007, 2009, 2011, 2013, 2015, 2017, 2019, 2021, 2023];
  return anos.map(ano => {
    const idebValue = school[`ideb_${ano}_${etapa}`] || "0,0";
    const ideb = parseFloat(idebValue.replace(",", ".")); // Converte para número
    return {
      ano: ano.toString(),
      ideb: isNaN(ideb) ? 0 : ideb,
    };
  });
}

interface SchoolDashboardProps {
  school: School
}

export function SchoolDashboard({ school }: SchoolDashboardProps) {
  const [isVisible, setIsVisible] = useState(false)

  const idebFundamentalFinais = getIdebSeries(school, "f");
  const idebFundamentalIniciais = getIdebSeries(school, "i");
  const idebMedio = getIdebSeries(school, "m");

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const formatCurrency = (value?: number) => {
    if (value == 0) return null;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* School Header */}
      <div
        className={`bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 md:p-8 transition-all duration-1000 hover:shadow-2xl ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4x whitespace-break-spaces font-bold mb-4 text-balance">{school.name}</h1>
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 text-white/90 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="break-words">
              {school.local}, {school.city}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 text-white/90 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 flex-shrink-0" />
            <span>{school.id}@seduc.go.gov.br</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 text-white/90 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 flex-shrink-0" />
            <span>{school.diretor} - Diretor(a)</span>
          </div>
        </div>
      </div>

      {/* IDEB Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle>IDEB - Fundamental Anos Iniciais - 5º ano</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="95%" height={200}>
              <BarChart data={idebFundamentalIniciais}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ano" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="ideb" fill="#059669" name="IDEB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IDEB - Fundamental Anos Finais - 9º ano</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="95%" height={200}>
              <BarChart data={idebFundamentalFinais}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ano" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="ideb" fill="#2563eb" name="IDEB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IDEB - Ensino Médio - 3º ano</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="95%" height={200}>
              <BarChart data={idebMedio}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ano" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="ideb" fill="#f59e42" name="IDEB" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Available Slots Card */}
        <Card
          className={`border-2 hover:shadow-2xl transition-all duration-500 hover:scale-102 hover:border-secondary active:scale-95 sm:col-span-2 md:col-span-1 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold">Alunos</CardTitle>
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-secondary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2 transition-all duration-300 hover:scale-102">
              {school.alunos_ativos && school.alunos_ativos > 0 ? school.alunos_ativos.toLocaleString("pt-BR") : "Não informado"}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">Matrículas ativas</p>
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground">Ano de referência: {new Date().getFullYear() - 1}</p>
              <p className="text-xs text-secondary font-medium mt-1">Fonte: <a href="https://dadosabertos.go.gov.br/dataset/quantitativo-de-alunos-por-etapa-de-ensino" target="blank">Dados Abertos Goiás</a></p>
            </div>
          </CardContent>
        </Card>

        {/* Public Investment Card */}
        <Card
          className={`border-2 hover:shadow-2xl transition-all duration-500 hover:scale-102 hover:border-accent active:scale-95 sm:col-span-2 md:col-span-1 ${
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
            <div className="text-3xl sm:text-4xl font-bold text-accent mb-2 transition-all duration-300 hover:scale-102 break-words">
              {formatCurrency(school.investimento_ano_atual) || "Não informado"}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">Repasses financeiros agrupados</p>
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground">Ano de referência: {new Date().getFullYear()}</p>
              <p className="text-xs text-accent font-medium mt-1">Fonte: <a href="https://goias.gov.br/educacao/repasse-escolar-pro-escola/" target="blank">Secretaria de Educação</a></p>
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
          <p className="text-sm">Aqui você descobre o que cada informação significa e porque ela é importante para 
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
            <h4 className="font-semibold text-sm mb-2">Matrículas Ativas</h4>
            <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
              Este é o número exato de alunos matriculados e ativos na unidade escolar. É um dado importante para entender a capacidade de atendimento da escola e é atualizado diretamente pela Controladoria Geral do Estado.
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
