import { Request, Response } from 'express';
import * as flightService from '../services/flightsService.js';

export const listFlights = (_req: Request, res: Response) => {
  const flights = flightService.getAllFlights();
  res.json(flights);
};
