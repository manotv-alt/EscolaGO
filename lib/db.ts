function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export interface School {
  id: string;
  name: string;
  city: string;
  phone: string;
  ideb_2005_f: string;
  ideb_2007_f: string;
  ideb_2009_f: string;
  ideb_2011_f: string;
  ideb_2013_f: string;
  ideb_2015_f: string;
  ideb_2017_f: string;
  ideb_2019_f: string;
  ideb_2021_f: string;
  ideb_2023_f: string;
  ideb_2005_i: string;
  ideb_2007_i: string;
  ideb_2009_i: string;
  ideb_2011_i: string;
  ideb_2013_i: string;
  ideb_2015_i: string;
  ideb_2017_i: string;
  ideb_2019_i: string;
  ideb_2021_i: string;
  ideb_2023_i: string;
  ideb_2017_m: string;
  ideb_2019_m: string;
  ideb_2021_m: string;
  ideb_2023_m: string;
  investimento_ano_atual?: number;
  alunos_ativos?: number;
}

interface ApiSchool {
  Id: string;
  Nome: string;
  Municipio: string;
  ideb_2005_f?: string;
  ideb_2007_f?: string;
  ideb_2009_f?: string;
  ideb_2011_f?: string;
  ideb_2013_f?: string;
  ideb_2015_f?: string;
  ideb_2017_f?: string;
  ideb_2019_f?: string;
  ideb_2021_f?: string;
  ideb_2023_f?: string;
  ideb_2005_i?: string;
  ideb_2007_i?: string;
  ideb_2009_i?: string;
  ideb_2011_i?: string;
  ideb_2013_i?: string;
  ideb_2015_i?: string;
  ideb_2017_i?: string;
  ideb_2019_i?: string;
  ideb_2021_i?: string;
  ideb_2023_i?: string;
  ideb_2017_m?: string;
  ideb_2019_m?: string;
  ideb_2021_m?: string;
  ideb_2023_m?: string;
  investimento_ano_atual?: number;
  alunos_ativos?: number;
}

let cachedSchools: School[] | null = null;

function mapApiSchool(apiSchool: ApiSchool): School {
  return {
    id: apiSchool.Id,
    name: apiSchool.Nome,
    city: apiSchool.Municipio,
    phone: (apiSchool as any).Telefone || "Não informado",
    ideb_2005_f: apiSchool.ideb_2005_f || "0,0",
    ideb_2007_f: apiSchool.ideb_2007_f || "0,0",
    ideb_2009_f: apiSchool.ideb_2009_f || "0,0",
    ideb_2011_f: apiSchool.ideb_2011_f || "0,0",
    ideb_2013_f: apiSchool.ideb_2013_f || "0,0",
    ideb_2015_f: apiSchool.ideb_2015_f || "0,0",
    ideb_2017_f: apiSchool.ideb_2017_f || "0,0",
    ideb_2019_f: apiSchool.ideb_2019_f || "0,0",
    ideb_2021_f: apiSchool.ideb_2021_f || "0,0",
    ideb_2023_f: apiSchool.ideb_2023_f || "0,0",
    ideb_2005_i: apiSchool.ideb_2005_i || "0,0",
    ideb_2007_i: apiSchool.ideb_2007_i || "0,0",
    ideb_2009_i: apiSchool.ideb_2009_i || "0,0",
    ideb_2011_i: apiSchool.ideb_2011_i || "0,0",
    ideb_2013_i: apiSchool.ideb_2013_i || "0,0",
    ideb_2015_i: apiSchool.ideb_2015_i || "0,0",
    ideb_2017_i: apiSchool.ideb_2017_i || "0,0",
    ideb_2019_i: apiSchool.ideb_2019_i || "0,0",
    ideb_2021_i: apiSchool.ideb_2021_i || "0,0",
    ideb_2023_i: apiSchool.ideb_2023_i || "0,0",
    ideb_2017_m: apiSchool.ideb_2017_m || "0,0",
    ideb_2019_m: apiSchool.ideb_2019_m || "0,0",
    ideb_2021_m: apiSchool.ideb_2021_m || "0,0",
    ideb_2023_m: apiSchool.ideb_2023_m || "0,0",
    investimento_ano_atual: apiSchool.investimento_ano_atual || 0,
    alunos_ativos: apiSchool.alunos_ativos || 0,
  };
}

export async function getAllSchools(): Promise<School[]> {
  if (cachedSchools) return cachedSchools;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Escolas`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error("Erro ao buscar dados da API:", response.statusText);
      return [];
    }

    const apiResponse = await response.json();
    const apiData: ApiSchool[] = Array.isArray(apiResponse)
      ? apiResponse
      : Array.isArray(apiResponse?.data)
      ? apiResponse.data
      : [];

    if (!Array.isArray(apiData)) {
      console.error("A resposta da API não é um array.", apiResponse);
      return [];
    }

    const schools: School[] = apiData.map(mapApiSchool);
    cachedSchools = schools;
    return schools;
  } catch (error) {
    console.error("Falha na conexão com a API:", error);
    return [];
  }
}

export async function getSchoolById(id: string): Promise<School | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Escolas/${id}`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error("Erro ao buscar dados da API:", response.statusText);
      return null;
    }

    let apiSchool: any = await response.json();
    console.log(apiSchool);

    if (apiSchool?.data) apiSchool = apiSchool.data;

    if (!apiSchool) return null;

    return mapApiSchool(apiSchool as ApiSchool);
  } catch (error) {
    console.error("Falha na conexão com a API:", error);
    return null;
  }
}

export async function searchSchools(query: string): Promise<School[]> {
  if (query.length < 3) return [];

  const schools = await getAllSchools();
  const normalizedQuery = normalizeString(query);

  return schools.filter((school) => {
    const normalizedName = normalizeString(school.name);
    const normalizedCity = normalizeString(school.city);

    return normalizedName.includes(normalizedQuery) || normalizedCity.includes(normalizedQuery);
  });
}

export async function getSchoolsByCity(city: string): Promise<School[]> {
  const schools = await getAllSchools();
  return schools.filter((school) => school.city.toLowerCase() === city.toLowerCase());
}

export async function getTotalData(): Promise<{ mediumIdeb?: number; totalStudents?: number; totalPublicInvestment?: number } | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dadosTotais`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error("Erro ao buscar dados da API:", response.statusText);
      return null;
    }

    let apiData: any = await response.json();

    if (apiData?.data) apiData = apiData.data;

    return {
      mediumIdeb: apiData.Ideb || 0,
      totalStudents: apiData.NumeroAlunos || 0,
      totalPublicInvestment: apiData.Investimento || 0,
    };
  } catch (error) {
    console.error("Falha na conexão com a API:", error);
    return null;
  }
}