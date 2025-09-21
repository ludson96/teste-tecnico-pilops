import flightHistory from "../data/flightHistory.json" with { type: "json" };

const flightsData = flightHistory.flights;

export const getAllFlights = () => flightsData;

export const getFlightById = (id: string) => flightsData.find(f => f.id === id);