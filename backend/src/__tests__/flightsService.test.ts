import { getFlightById, getTotalBalance } from '../services/flightsService.js';

jest.mock('../data/flightHistory.json', () => ({
  flights: [
    { id: 'MOCK-1', flightData: { balance: 150.50 } },
    { id: 'MOCK-2', flightData: { balance: -25.25 } },
    { id: 'MOCK-3', flightData: { balance: 100.00 } },
  ],
}), { virtual: true });

describe('flightsService', () => {
  test('deve retornar os detalhes corretos de um voo existente', () => {
    const flight = getFlightById('FL-001');

    expect(flight).toBeDefined();

    // O '!' afirma ao TypeScript que 'flight' não é undefined aqui
    expect(flight!.id).toBe('FL-001');
  });

  test('deve retornar undefined para um voo inexistente', () => {
    const missing = getFlightById('FL-99999999');
    expect(missing).toBeUndefined();
  });

  test('deve calcular e retornar a soma correta de todos os saldos', () => {
    // 150.50 - 25.25 + 100.00 = 225.25
    const expectedTotal = 225.25;

    const total = getTotalBalance();

    expect(typeof total).toBe('number');
    expect(total).toBe(expectedTotal);

    expect(total).toBeCloseTo(expectedTotal);
  });

});
