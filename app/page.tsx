import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { InfoSection } from "@/components/info-section"
import { Card, CardContent } from "@/components/ui/card"
import { getAverageIdeb, getTotalAvailableSlots, getTotalPublicInvestment } from "@/lib/db"

export default async function HomePage() {
  const [avgIdeb, totalSlots, totalInvestment] = await Promise.all([
    getAverageIdeb(),
    getTotalAvailableSlots(),
    getTotalPublicInvestment(),
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <InfoSection />

        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Dados em Tempo Real</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-white/10 border-white/20 backdrop-blur">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{avgIdeb.toFixed(1)}</div>
                  <p className="text-white/90">IDEB Médio Estadual</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/20 backdrop-blur">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{totalSlots.toLocaleString("pt-BR")}</div>
                  <p className="text-white/90">Vagas Disponíveis</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 border-white/20 backdrop-blur">
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{formatCurrency(totalInvestment)}</div>
                  <p className="text-white/90">Investimento Total</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
