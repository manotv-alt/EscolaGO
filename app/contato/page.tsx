"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 sm:py-16 md:py-24 animate-gradient">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Entre em Contato
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 text-pretty animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                Tem dúvidas, sugestões ou quer reportar algum problema? Estamos aqui para ajudar.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                {/* Contact Info */}
                <div className="space-y-4 sm:space-y-6">
                  <Card className="border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-100">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110 hover:rotate-12">
                          <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <h3 className="font-bold mb-2 text-sm sm:text-base">Email</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground break-all">
                          contato@transparenciaescolar.go.gov.br
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-100">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110 hover:rotate-12">
                          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                        </div>
                        <h3 className="font-bold mb-2 text-sm sm:text-base">Suporte</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground text-pretty">
                          Respondemos em até 48 horas úteis
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Form */}
                <div className="md:col-span-2">
                  <Card className="border-2 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">Envie sua Mensagem</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isSubmitted ? (
                        <div className="py-12 text-center animate-in zoom-in duration-500">
                          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                            <Send className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold mb-2">Mensagem Enviada!</h3>
                          <p className="text-sm sm:text-base text-muted-foreground">
                            Obrigado pelo contato. Responderemos em breve.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm sm:text-base">
                              Nome Completo
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Seu nome"
                              value={formData.name}
                              onChange={handleChange}
                              className="transition-all focus:scale-[1.01] text-sm sm:text-base"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm sm:text-base">
                              Email
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="seu@email.com"
                              value={formData.email}
                              onChange={handleChange}
                              className="transition-all focus:scale-[1.01] text-sm sm:text-base"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="subject" className="text-sm sm:text-base">
                              Assunto
                            </Label>
                            <Input
                              id="subject"
                              name="subject"
                              placeholder="Sobre o que você quer falar?"
                              value={formData.subject}
                              onChange={handleChange}
                              className="transition-all focus:scale-[1.01] text-sm sm:text-base"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message" className="text-sm sm:text-base">
                              Mensagem
                            </Label>
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Escreva sua mensagem aqui..."
                              rows={6}
                              value={formData.message}
                              onChange={handleChange}
                              className="transition-all focus:scale-[1.01] text-sm sm:text-base resize-none"
                              required
                            />
                          </div>

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Enviar Mensagem
                              </>
                            )}
                          </Button>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
