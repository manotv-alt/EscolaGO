function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD") // Separa os acentos das letras
    .replace(/[\u0300-\u036f]/g, ""); // Remove os acentos
}

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

interface ApiSchool {
  Id: string
  Nome: string
  Municipio: string
}

// CACHE EM MEMÓRIA
let cachedSchools: School[] | null = null;

export async function getAllSchools(): Promise<School[]> {
  if (cachedSchools) {
    return cachedSchools;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Escolas` , {
      next: { revalidate: 3600 } // Revalida a cada 1 hora
    });
    
    if (!response.ok) {
      console.error("Erro ao buscar dados da API:", response.statusText);
      return [];
    }
    
    const apiResponse = await response.json();
    const apiData: ApiSchool[] = apiResponse.data;

    if (!Array.isArray(apiData)) {
      console.error("A propriedade 'data' na resposta da API não é um array.");
      return [];
    }

    const schools: School[] = apiData.map(apiSchool => ({
      id: apiSchool.Id,
      name: apiSchool.Nome,
      city: apiSchool.Municipio,
      district: 'Não informado',
      address: 'Não informado',
      phone: 'Não informado',
      email: 'nao.informado@seduc.go.gov.br',
      ideb: 0,
      idebYear: 2024,
      availableSlots: 0,
      totalStudents: 0,
      publicInvestment: 0,
      investmentYear: 2024,
    }));

    // Guardamos a lista de escolas no cache
    cachedSchools = schools;
    return schools;

  } catch (error) {
    console.error("Falha na conexão com a API:", error);
    return [];
  }
}

export async function getSchoolById(id: string): Promise<School | null> {
  const schools = await getAllSchools();
  return schools.find((school) => school.id === id) || null;
}

export async function searchSchools(query: string): Promise<School[]> {
  if (query.length < 3) return [];

  const schools = await getAllSchools();
  
  const normalizedQuery = normalizeString(query);

  return schools.filter((school) => {
    const normalizedName = normalizeString(school.name);
    const normalizedCity = normalizeString(school.city);

    return (
      normalizedName.includes(normalizedQuery) ||
      normalizedCity.includes(normalizedQuery)
    );
  });
}

export async function getSchoolsByCity(city: string): Promise<School[]> {
  const schools = await getAllSchools();
  return schools.filter((school) => school.city.toLowerCase() === city.toLowerCase());
}

export async function getAverageIdeb(): Promise<number> {
  const schools = await getAllSchools();
  if (schools.length === 0) return 0;
  const sum = schools.reduce((acc, school) => acc + school.ideb, 0);
  return sum / schools.length;
}

export async function getTotalAvailableSlots(): Promise<number> {
  const schools = await getAllSchools();
  return schools.reduce((acc, school) => acc + school.availableSlots, 0);
}

export async function getTotalPublicInvestment(): Promise<number> {
  const schools = await getAllSchools();
  return schools.reduce((acc, school) => acc + school.publicInvestment, 0);
}