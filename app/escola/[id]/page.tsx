import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SchoolDashboard } from "@/components/school-dashboard"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSchoolById } from "@/lib/db"

export default async function SchoolPage({ params }: { params: { id: string } }) {
  const school = await getSchoolById(params.id)

  if (!school) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para busca
          </Button>
        </Link>
        <SchoolDashboard school={school} />
      </main>
      <Footer />
    </div>
  )
}
