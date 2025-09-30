import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Escola não encontrada</h1>
          <p className="text-muted-foreground mb-8 text-pretty">
            A escola que você está procurando não existe ou foi removida do sistema.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Voltar para a página inicial
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
