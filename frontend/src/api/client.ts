export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: 'no-store',
      ...options,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({ message: 'Falha ao analisar a resposta de erro' }));
      throw new Error(errorBody.message || 'Falha ao buscar dados do backend');
    }

    const text = await res.text();
    return text ? JSON.parse(text) : ({} as T);

  } catch (error) {
    console.error("API Fetch Error:", error);
    throw new Error('Falha ao conectar com a API. Verifique se o servidor backend está rodando.');
  }
}
