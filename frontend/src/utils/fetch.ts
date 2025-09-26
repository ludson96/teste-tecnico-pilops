import { IFlight } from "@/interfaces/IFlight";

// Função para buscar os dados da API do seu backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getFlights(page = 1, limit = 5) {
  const API_URL = `${API_BASE_URL}/flights?page=${page}&limit=${limit}`;

  try {
    const res = await fetch(API_URL, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch flights from the backend');
    }

    return res.json();
  } catch (error) {
    console.error("API Fetch Error:", error);

    throw new Error('Falha ao conectar com a API de voos. Verifique se o servidor backend está rodando.');
  }
}

export async function getFlightDetails(id: string): Promise<IFlight> {
  // A URL completa para o endpoint do seu backend
  const API_URL = `${API_BASE_URL}/flights/${id}`;

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