import { getFlightById } from '../services/flightsService.js';

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

});
