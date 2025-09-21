import { Request, Response } from 'express';
import * as flightService from '../services/flightsService.js';

export const listFlights = (_req: Request, res: Response) => {
  const flights = flightService.getAllFlights();
  res.json(flights);
};

export const getFlightDetails = (req: Request, res: Response) => {
  const flight = flightService.getFlightById(req.params.id);
  if (!flight) return res.status(404).json({ message: 'Flight not found' });
  res.json(flight);
};
