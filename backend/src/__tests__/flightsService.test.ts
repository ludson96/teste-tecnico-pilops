import { jest } from '@jest/globals';

jest.unstable_mockModule('../data/flightHistory.json', () => ({
  default: {
    flights: [
      { id: 'MOCK-1', flightData: { balance: 150.50 } },
      { id: 'MOCK-2', flightData: { balance: -25.25 } },
      { id: 'MOCK-3', flightData: { balance: 100.00 } },
      { id: 'MOCK-4', flightData: { balance: 500.00 } },
      { id: 'MOCK-5', flightData: { balance: 1600.00 } },
    ],
  },
}));

const { getAllFlights, getFlightById, getTotalBalance } = await import('../services/flightsService.js');

describe('flightsService', () => {

  describe('getFlightById voo específico', () => {
    test('deve retornar os detalhes corretos de um voo existente', () => {
      const flight = getFlightById('MOCK-1');

      expect(flight).toBeDefined();

      expect(flight).toStrictEqual({ id: 'MOCK-1', flightData: { balance: 150.50 } });
    });

    test('deve retornar undefined para um voo inexistente', () => {
      const missing = getFlightById('FL-99999999');
      expect(missing).toBeUndefined();
    });
  });

  describe('getTotalBalance calcula saldo total acumulado dos voos', () => {
    test('deve calcular e retornar a soma correta de todos os saldos', () => {
      // 150.50 - 25.25 + 100.00 + 500.00 + 1600.00 = 2325.25
      const expectedTotal = 2325.25;

      const total = getTotalBalance();

      expect(typeof total).toBe('number');
      expect(total).toBe(expectedTotal);
      expect(total).toBeCloseTo(expectedTotal);
    });
  });

  describe('getAllFlights paginação', () => {
    test('deve retornar o número correto de itens por página', () => {
      const page1 = getAllFlights(1, 5);
      console.log("Total de items:", page1.flights.length);

      expect(page1.flights.length).toBe(5);
      expect(page1.totalItems).toBeGreaterThanOrEqual(5);
    });

    test('deve retornar itens diferentes em páginas diferentes', () => {
      const page1 = getAllFlights(1, 5);
      const page2 = getAllFlights(2, 5);

      if (page1.totalItems > 5) {
        expect(page2.flights.length).toBeGreaterThan(0);
        expect(page1.flights[0].id).not.toEqual(page2.flights[0].id);
      }
    });

    test('deve lidar com a última página quando ela não estiver cheia', () => {
      const totalItems = getAllFlights(1, 1).totalItems;
      const LIMIT = 5;
      const lastPageNumber = Math.ceil(totalItems / LIMIT);
      const expectedLength = totalItems % LIMIT || LIMIT;

      const lastPage = getAllFlights(lastPageNumber, LIMIT);
      expect(lastPage.flights.length).toBe(expectedLength);
    });
  });

});
