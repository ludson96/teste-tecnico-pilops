import { IFlight } from "@/interfaces/IFlight";

interface ApiResponse {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  data: IFlight[];
}

// Função para buscar os dados da API do seu backend
export async function getFlights(): Promise<ApiResponse> {
  // A URL completa para o endpoint do seu backend
  const API_URL = 'http://localhost:3001/flights?page=1&limit=5';

  try {
    const res = await fetch(API_URL, {
      // Em Next.js, 'force-cache' é o padrão.
      // Usamos 'no-store' para garantir que os dados sejam sempre buscados do servidor a cada requisição.
      // Você pode ajustar essa política de cache conforme sua necessidade.
      cache: 'no-store',
    });

    if (!res.ok) {
      // Se a resposta não for OK, lança um erro que pode ser pego pelo error.tsx do Next.js
      throw new Error('Failed to fetch flights from the backend');
    }

    return res.json();
  } catch (error) {
    // Loga o erro original que é mais específico (ex: TypeError: Failed to fetch)
    console.error("API Fetch Error:", error);

    // Lança um novo erro com uma mensagem mais amigável para o usuário
    throw new Error('Falha ao conectar com a API de voos. Verifique se o servidor backend está rodando.');
  }
}