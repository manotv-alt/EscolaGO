// Database integration layer
// This simulates integration with INEP, Seduc-GO, and Portal da Transparência

export interface School {
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

// Simulated database with comprehensive school data
// In production, this would connect to actual databases:
// - INEP API for IDEB scores
// - Seduc-GO API for enrollment data
// - Portal da Transparência API for investment data
const schoolsDatabase: School[] = [
  {
    id: "1",
    name: "Colégio Estadual da Polícia Militar de Goiás",
    city: "Goiânia",
    district: "Setor Central",
    address: "Rua 82, nº 115",
    phone: "(62) 3201-3000",
    email: "cepmg@seduc.go.gov.br",
    ideb: 6.8,
    idebYear: 2023,
    availableSlots: 45,
    totalStudents: 1250,
    publicInvestment: 2850000,
    investmentYear: 2024,
  },
  {
    id: "2",
    name: "Colégio Estadual José Carlos de Almeida",
    city: "Goiânia",
    district: "Setor Bueno",
    address: "Avenida T-9, nº 1823",
    phone: "(62) 3201-4500",
    email: "cejca@seduc.go.gov.br",
    ideb: 5.9,
    idebYear: 2023,
    availableSlots: 32,
    totalStudents: 980,
    publicInvestment: 1950000,
    investmentYear: 2024,
  },
  {
    id: "3",
    name: "Escola Estadual Professor Joaquim Alves",
    city: "Anápolis",
    district: "Centro",
    address: "Rua Barão do Rio Branco, nº 456",
    phone: "(62) 3324-5600",
    email: "eepja@seduc.go.gov.br",
    ideb: 5.4,
    idebYear: 2023,
    availableSlots: 28,
    totalStudents: 750,
    publicInvestment: 1450000,
    investmentYear: 2024,
  },
  {
    id: "4",
    name: "Colégio Estadual Lyceu de Goiânia",
    city: "Goiânia",
    district: "Setor Central",
    address: "Praça Cívica, s/n",
    phone: "(62) 3201-5000",
    email: "lyceu@seduc.go.gov.br",
    ideb: 7.2,
    idebYear: 2023,
    availableSlots: 18,
    totalStudents: 1450,
    publicInvestment: 3200000,
    investmentYear: 2024,
  },
  {
    id: "5",
    name: "Escola Estadual Deputado José de Assis",
    city: "Aparecida de Goiânia",
    district: "Centro",
    address: "Rua 7, nº 234",
    phone: "(62) 3545-2100",
    email: "eedja@seduc.go.gov.br",
    ideb: 5.6,
    idebYear: 2023,
    availableSlots: 52,
    totalStudents: 890,
    publicInvestment: 1680000,
    investmentYear: 2024,
  },
  {
    id: "6",
    name: "Colégio Estadual Jardim América",
    city: "Goiânia",
    district: "Jardim América",
    address: "Avenida Jardim América, nº 789",
    phone: "(62) 3201-6700",
    email: "ceja@seduc.go.gov.br",
    ideb: 6.1,
    idebYear: 2023,
    availableSlots: 38,
    totalStudents: 1120,
    publicInvestment: 2150000,
    investmentYear: 2024,
  },
  {
    id: "7",
    name: "Escola Estadual Senador Onofre Quinan",
    city: "Goiânia",
    district: "Setor Oeste",
    address: "Rua 70, nº 456",
    phone: "(62) 3201-7800",
    email: "eesoq@seduc.go.gov.br",
    ideb: 5.8,
    idebYear: 2023,
    availableSlots: 41,
    totalStudents: 1050,
    publicInvestment: 1980000,
    investmentYear: 2024,
  },
  {
    id: "8",
    name: "Colégio Estadual Professor Pedro Gomes",
    city: "Goiânia",
    district: "Setor Pedro Ludovico",
    address: "Rua 235, nº 123",
    phone: "(62) 3201-8900",
    email: "ceppg@seduc.go.gov.br",
    ideb: 6.4,
    idebYear: 2023,
    availableSlots: 29,
    totalStudents: 1180,
    publicInvestment: 2350000,
    investmentYear: 2024,
  },
  {
    id: "9",
    name: "Escola Estadual Dom Fernando",
    city: "Goiânia",
    district: "Setor Sul",
    address: "Avenida Anhanguera, nº 3456",
    phone: "(62) 3201-9100",
    email: "eedf@seduc.go.gov.br",
    ideb: 5.7,
    idebYear: 2023,
    availableSlots: 47,
    totalStudents: 920,
    publicInvestment: 1750000,
    investmentYear: 2024,
  },
  {
    id: "10",
    name: "Colégio Estadual Polivalente",
    city: "Goiânia",
    district: "Setor Universitário",
    address: "Rua 227, nº 890",
    phone: "(62) 3201-9500",
    email: "cep@seduc.go.gov.br",
    ideb: 6.9,
    idebYear: 2023,
    availableSlots: 22,
    totalStudents: 1380,
    publicInvestment: 2950000,
    investmentYear: 2024,
  },
  {
    id: "11",
    name: "Escola Estadual Vila Nova",
    city: "Aparecida de Goiânia",
    district: "Vila Nova",
    address: "Rua 15, nº 567",
    phone: "(62) 3545-3200",
    email: "eevn@seduc.go.gov.br",
    ideb: 5.3,
    idebYear: 2023,
    availableSlots: 56,
    totalStudents: 780,
    publicInvestment: 1420000,
    investmentYear: 2024,
  },
  {
    id: "12",
    name: "Colégio Estadual Ary Ribeiro Valadão Filho",
    city: "Anápolis",
    district: "Jundiaí",
    address: "Avenida Brasil, nº 2345",
    phone: "(62) 3324-6800",
    email: "cearvf@seduc.go.gov.br",
    ideb: 6.2,
    idebYear: 2023,
    availableSlots: 35,
    totalStudents: 1090,
    publicInvestment: 2080000,
    investmentYear: 2024,
  },
]

// API functions to simulate database queries

export async function getAllSchools(): Promise<School[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return schoolsDatabase
}

export async function getSchoolById(id: string): Promise<School | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return schoolsDatabase.find((school) => school.id === id) || null
}

export async function searchSchools(query: string): Promise<School[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (query.length < 2) return []

  const lowerQuery = query.toLowerCase()
  return schoolsDatabase.filter(
    (school) =>
      school.name.toLowerCase().includes(lowerQuery) ||
      school.city.toLowerCase().includes(lowerQuery) ||
      school.district.toLowerCase().includes(lowerQuery),
  )
}

export async function getSchoolsByCity(city: string): Promise<School[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return schoolsDatabase.filter((school) => school.city.toLowerCase() === city.toLowerCase())
}

// Statistics functions
export async function getAverageIdeb(): Promise<number> {
  const schools = await getAllSchools()
  const sum = schools.reduce((acc, school) => acc + school.ideb, 0)
  return sum / schools.length
}

export async function getTotalAvailableSlots(): Promise<number> {
  const schools = await getAllSchools()
  return schools.reduce((acc, school) => acc + school.availableSlots, 0)
}

export async function getTotalPublicInvestment(): Promise<number> {
  const schools = await getAllSchools()
  return schools.reduce((acc, school) => acc + school.publicInvestment, 0)
}
