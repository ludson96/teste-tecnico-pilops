import { Flight, FlightsResponse } from "@/interfaces/flights";
import { apiFetch } from "./client";

export async function getFlights(page = 1, limit = 5): Promise<FlightsResponse> {
  return apiFetch<FlightsResponse>(`/flights?page=${page}&limit=${limit}`);
}

export async function getFlightDetails(id: string): Promise<Flight> {
  return apiFetch<Flight>(`/flights/${id}`);
}