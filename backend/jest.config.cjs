/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // O preset 'default-esm' já configura o transform, moduleNameMapper, extensionsToTreatAsEsm e globals para ESM.
  // As configurações manuais que estavam aqui foram removidas por serem redundantes.
  preset: "ts-jest/presets/default-esm",
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    // Arquivos que não devem ser incluídos na cobertura
    '!src/server.ts',
    '!src/app.ts',
    '!src/types/**/*.ts',
    '!src/data/**/*.ts',
  ],
  // `testMatch` é a configuração padrão do Jest, então não é estritamente necessário, mas é bom deixar explícito.
  testMatch: [
    '**/__tests__/**/*.test.ts'
  ],
  // Mapear imports que terminam em .js para permitir escrever imports ESM nos arquivos TS
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }]
  },
  extensionsToTreatAsEsm: ['.ts'],
};
