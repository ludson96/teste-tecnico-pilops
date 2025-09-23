// flightsController.test.ts
import { jest } from "@jest/globals";

jest.unstable_mockModule("../services/flightsService.js", () => ({
  getAllFlights: jest.fn(),
  getFlightById: jest.fn(),
  getTotalBalance: jest.fn(),
}));

const flightService = await import("../services/flightsService.js");
const { listFlights } = await import("../controllers/flightsController.js");

describe('flightsController', () => {

  describe("listFlights controller", () => {
    test("deve retornar a lista de voos paginada", () => {
      const req: any = { query: { page: "2", limit: "5" } };
      const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      (flightService.getAllFlights as jest.Mock).mockReturnValue({totalItems: 12, flights: [{ id: "MOCK-1" }, { id: "MOCK-2" }]});

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
  });

});
