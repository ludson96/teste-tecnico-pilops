import jsonData from "../data/flightHistory.json" with { type: "json" };

const { flights } = jsonData;

export const getAllFlights = (page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedFlights = flights.slice(startIndex, endIndex);

  return {
    totalItems: flights.length,
    flights: paginatedFlights
  };
};

export const getFlightById = (id: string) => flights.find(f => f.id === id);

export const getTotalBalance = () => flights.reduce((sum, f) => sum + f.flightData.balance, 0);