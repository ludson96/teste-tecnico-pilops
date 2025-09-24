// d:/Code/Desafios técnicos/teste-tecnico-pilops/frontend/src/app/flights/page.tsx

// Tipagem para os dados que esperamos da API
interface Flight {
id: string;
aircraft: {
    name: string;
    registration: string;
    airline: string;
},
flightData: {
    date: string;
    balance: number
    route: {
        from: string;
        to: string;
    },
    xp: number;
    missionBonus: number;
}
  // Adicione outros campos que sua API retorna
}

interface ApiResponse {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  data: Flight[];
}

// Função para buscar os dados da API do seu backend
async function getFlights(): Promise<ApiResponse> {
  // A URL completa para o endpoint do seu backend
  const API_URL = 'http://localhost:3001/flights?page=1&limit=10';

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

// Este é um React Server Component (padrão no App Router do Next.js)
// Ele roda no servidor, busca os dados e então renderiza o HTML que é enviado ao cliente.
export default async function FlightsPage() {
  const { data: flights, totalItems } = await getFlights();

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Voos ({totalItems})</h1>

      {flights.length > 0 ? (
        <ul className="space-y-4">
          {flights.map((flight) => (
            <li key={flight.id} className="p-4 border rounded-lg shadow-sm">
              <p className="font-semibold">{flight.aircraft.airline} - Voo {flight.aircraft.registration}</p>
              <p>Origem: {flight.flightData.route.from}</p>
              <p>Destino: {flight.flightData.route.to}</p>
              <p>Balance: <span className="font-medium">{flight.flightData.balance}</span></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum voo encontrado.</p>
      )}
    </main>
  );
}
