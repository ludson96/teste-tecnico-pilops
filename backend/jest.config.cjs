/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // O preset 'default-esm' já configura o transform, moduleNameMapper, extensionsToTreatAsEsm e globals para ESM.
  // As configurações manuais que estavam aqui foram removidas por serem redundantes.
  preset: "ts-jest/presets/default-esm",
  testEnvironment: 'node',
  // A propriedade 'roots' foi removida. Por padrão, o Jest já procura em todo o projeto ('<rootDir>').
  // Isso corrige o problema de não encontrar os testes na pasta 'tests' no diretório raiz.
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    // Arquivos que não devem ser incluídos na cobertura
    '!src/server.ts',
    '!src/app.ts',
    '!src/types/**/*.ts',
    '!src/data/**/*.ts',
  ],
  testMatch: [
    // Aponta diretamente para a pasta de testes na raiz do projeto.
    '<rootDir>/tests/**/*.test.ts'
  ]
};
