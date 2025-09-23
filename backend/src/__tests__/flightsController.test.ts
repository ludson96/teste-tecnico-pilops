import { jest } from "@jest/globals";
import { Request, Response } from "express";

jest.unstable_mockModule("../services/flightsService.js", () => ({
  getAllFlights: jest.fn(),
  getFlightById: jest.fn(),
  getTotalBalance: jest.fn(),
}));

const flightService = await import("../services/flightsService.js");
const { listFlights, getFlightDetails, totalBalance } = await import("../controllers/flightsController.js");

describe('flightsController', () => {
  beforeEach(() => {
    (flightService.getAllFlights as jest.Mock).mockClear();
    (flightService.getFlightById as jest.Mock).mockClear();
    (flightService.getTotalBalance as jest.Mock).mockClear();
  });

  describe("listFlights controller", () => {
    test("deve retornar a lista de voos paginada", () => {
      const req = { query: { page: "2", limit: "5" } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      (flightService.getAllFlights as jest.Mock).mockReturnValue({ totalItems: 12, flights: [{ id: "MOCK-1" }, { id: "MOCK-2" }] });

      listFlights(req, res);

      expect(flightService.getAllFlights).toHaveBeenCalledWith(2, 5);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        currentPage: 2,
        totalPages: 3,
        itemsPerPage: 5,
        totalItems: 12,
        data: [{ id: "MOCK-1" }, { id: "MOCK-2" }],
      });
    });

    test('deve usar os valores padrão para página e limite quando não fornecidos', () => {
      const req = { query: {} } as unknown as Request; // Sem page ou limit
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      (flightService.getAllFlights as jest.Mock).mockReturnValue({ totalItems: 25, flights: [] });

      listFlights(req, res);

      expect(flightService.getAllFlights).toHaveBeenCalledWith(1, 10);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        currentPage: 1,
        itemsPerPage: 10,
      }));
    });
  });

  describe('getFlightDetails controller', () => {
    test('deve retornar os detalhes corretos de um voo específico', () => {
      const req = { params: { id: 'MOCK-1' } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      (flightService.getFlightById as jest.Mock).mockReturnValue({ id: 'MOCK-1', flightData: { balance: 150.50 } });

      getFlightDetails(req, res)

      expect(flightService.getFlightById).toHaveBeenCalledWith('MOCK-1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 'MOCK-1', flightData: { balance: 150.50 } });
    });

    test('deve retornar undefined para um voo inexistente', () => {
      const req = { params: { id: 'MOCK-99999999' } } as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      (flightService.getFlightById as jest.Mock).mockReturnValue(undefined);

      getFlightDetails(req, res)

      expect(flightService.getFlightById).toHaveBeenCalledWith('MOCK-99999999');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Flight not found' });
    });
  });

  describe('totalBalance controller', () => {
    test('deve retornar a soma dos saldos de todos os voos', () => {
      const req = {} as unknown as Request;
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

      (flightService.getTotalBalance as jest.Mock).mockReturnValue(2325.25);

      totalBalance(req, res);

      expect(flightService.getTotalBalance).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ total: 2325.25 });

    });
  });
});
