import jsonData from "../data/flightHistory.json" with { type: "json" };

const { flights: flightsData } = jsonData;

export const getAllFlights = (page: number, limit: number) => {
  const allFlights = flightsData;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedFlights = allFlights.slice(startIndex, endIndex);

  return {
    totalItems: allFlights.length,
    flights: paginatedFlights
  };
};

export const getFlightById = (id: string) => flightsData.find(f => f.id === id);

export const getTotalBalance = () => flightsData.reduce((sum, f) => sum + f.flightData.balance, 0);