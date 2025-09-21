import jsonData from "../data/flightHistory.json" with { type: "json" };

const { flights: flightsData } = jsonData;

export const getAllFlights = () => flightsData;

export const getFlightById = (id: string) => flightsData.find(f => f.id === id);

export const getTotalBalance = () => flightsData.reduce((sum, f) => sum + f.flightData.balance, 0);