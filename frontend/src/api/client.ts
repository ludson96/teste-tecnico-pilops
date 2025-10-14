export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      next: {
        revalidate: 3600, // Revalida o cache a cada 1 hora (3600 segundos)
      },
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({ message: 'Falha ao analisar a resposta de erro' }));
      throw new Error(errorBody.message || 'Falha ao buscar dados do backend');
    }

    // Planejamento furuto: caso retorne "204 No Content", não há corpo para analisar.
    if (res.status === 204) {
      return {} as T;
    }

    return res.json() as Promise<T>;

  } catch (error) {
    console.error("API Fetch Error:", error);
    throw new Error('Falha ao conectar com a API. Verifique se o servidor backend está rodando.');
  }
}
