import { Request, Response } from 'express';
import * as flightService from '../services/flightsService.js';

export const listFlights = (req: Request, res: Response) => {
  // Código adapatado de https://blog.devgenius.io/pagination-in-node-js-512fbb809103
  // 1. Leitura dos query parameters da URL
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  // 2. Chama o serviço, agora passando os parâmetros de paginação
  const result = flightService.getAllFlights(page, limit);
  
  // 3. Monta a resposta final com metadados de paginação
  const totalPages = Math.ceil(result.totalItems / limit);

  const response = {
    currentPage: page,
    totalPages: totalPages,
    itemsPerPage: limit,
    totalItems: result.totalItems,
    data: result.flights
  };

  res.status(200).json(response);
};

export const getFlightDetails = (req: Request, res: Response) => {
  const flight = flightService.getFlightById(req.params.id);
  if (!flight) return res.status(404).json({ message: 'Flight not found' });
  res.json(flight);
};

export const totalBalance = (_req: Request, res: Response) => {
  const total = flightService.getTotalBalance();
  const roundedTotal = Math.round(total * 100) / 100;
  res.json({ total: roundedTotal });
};