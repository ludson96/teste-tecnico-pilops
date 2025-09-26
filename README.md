# ✈️ Teste técnico - `Pilops`

Projeto desenvolvido como parte do processo seletivo para a vaga de `Engenheiro(a) de software fullstack (estágio/Júnior)`.

## 🛠️ Linguagens e ferramentas usadas

[![Git][Git-logo]][Git-url]
[![HTML5][HTML5-logo]][HTML5-url]
[![CSS3][CSS3-logo]][CSS3-url]
[![JavaScript][JavaScript-logo]][JavaScript-url]
[![React][React-logo]][React-url]
[![RTL][RTL-logo]][RTL-url]
[![NodeJS][NodeJS-logo]][NodeJS-url]
[![Jest][Jest-logo]][Jest-url]
[![Express][Express-logo]][Express-url]
[![TypeScript][TypeScript-logo]][TypeScript-url]
[![Nodemon][Nodemon-logo]][Nodemon-url]
[![ESLint][ESLint-logo]][ESLint-url]
[![ts-node][ts-node-logo]][ts-node-url]
[![Next.js][Next.js-logo]][Next.js-url]
[![Tailwind-CSS][Tailwind-CSS-logo]][Tailwind-CSS-url]

## 📝 O que foi desenvolvido

Aplicação full stack para listar e detalhar voos a partir de dados fornecidos pela Pilops, demonstrando habilidades em Next.js, TypeScript, Node.js e Express. A aplicação é composta por um frontend para interação do usuário e um backend que fornece os dados e a lógica necessária.

### 💻 Frontend

O frontend, construído com Next.js, oferece as seguintes funcionalidades:

- **Lista de Voos:** Exibe uma lista completa de voos, permitindo a visualização rápida das informações essenciais de cada voo.
- **Detalhes do Voo:** Ao clicar em um voo da lista, o usuário é redirecionado para uma página com os detalhes completos daquele voo, incluindo informações como aeronave, rota, data e saldo.

### ⚙️ Backend

O backend, desenvolvido com Node.js e Express, oferece os seguintes endpoints:

- `GET /flights`: Retorna uma lista de todos os voos, incluindo informações como aeronave, rota, matrícula, data e saldo.
- `GET /flights/:id`: Retorna os detalhes completos de um voo específico, permitindo a recuperação de informações detalhadas sobre um voo individual.
- `GET /flights/total-balance`: Calcula e retorna o saldo total acumulado de todos os voos.

## 🏛️ Arquitetura do Backend

O backend segue a arquitetura MVC (Model-View-Controller), com as seguintes responsabilidades:

- **Controllers:** Responsáveis por receber as requisições HTTP, interagir com os services e retornar as respostas.
- **Services:** Contêm a lógica de negócio da aplicação, como a busca e cálculo de dados dos voos.
- **Models:** Representam as entidades de domínio, como os objetos de voo.

A entrada de dados é validada para garantir a integridade das informações. O tratamento de erros é realizado através de middlewares, que capturam as exceções e retornam respostas HTTP adequadas.

## ⚛️ Arquitetura do Frontend

O frontend é construído com Next.js e utiliza os seguintes componentes principais:

- **FlightList:** Exibe a lista de voos.
- **FlightDetails:** Mostra os detalhes de um voo específico.

## 💡 Decisões técnicas

1. **Backend com TypeScript e ES Modules:** A escolha do TypeScript para o backend foi motivada pela segurança de tipos, que reduz erros em tempo de execução e melhora a manutenibilidade do código. A utilização de ES Modules (`"type": "module"` no `package.json`) alinha o backend com as práticas mais modernas do ecossistema JavaScript, permitindo o uso nativo da sintaxe `import`/`export` e garantindo consistência com o frontend.

2. **Arquitetura MVC no Backend:** A adoção do padrão Model-View-Controller (neste caso, Model-Service-Controller) foi uma decisão para garantir a separação de responsabilidades.
    - **Controllers** lidam exclusivamente com a camada de requisição e resposta (HTTP).
    - **Services** encapsulam toda a lógica de negócio, mantendo os controllers enxutos e focados.
    - **Models** representam as estruturas de dados da aplicação.
    Essa separação facilita a testabilidade, a manutenção e a escalabilidade da API.

3. **Testes com Jest e Módulos ES:** Para os testes do backend, foi utilizado o Jest com `ts-jest`. Uma decisão técnica importante foi a necessidade de usar a flag `node --experimental-vm-modules` para executar os testes. Isso foi necessário para compatibilizar o Jest, que historicamente tem melhor suporte a CommonJS, com o uso de ES Modules nativos no projeto, mantendo um sistema de módulos unificado.

4. **Frontend com Next.js:** A escolha do Next.js para o frontend foi estratégica para aproveitar seus recursos de renderização no lado do servidor (SSR) e geração de sites estáticos (SSG). Isso resulta em uma melhor performance de carregamento inicial e otimização para SEO, criando uma experiência de usuário mais fluida ao navegar entre a lista de voos e os detalhes de cada um.

## 📈 Mudanças que faria se tivesse mais tempo

### Backend

1. **Refatoração e Versionamento de Rotas:** Em vez de expor os endpoints diretamente na raiz (ex: `/flights`), introduziria um prefixo `/api/v1/` para todas as rotas. Isso melhora a organização e facilita o versionamento da API no futuro (ex: `/api/v2/`).
2. **Funcionalidades Avançadas de Consulta:** Implementaria um sistema robusto de filtros, ordenação e paginação na rota `GET /flights`. Isso permitiria consultas como:
    - Filtrar por intervalo de datas (`/flights?startDate=...&endDate=...`).
    - Ordenar por saldo ou data (`/flights?sortBy=balance&order=desc`).
    - Paginar os resultados para lidar com grandes volumes de dados (`/flights?page=2&limit=20`).
3. **Enriquecimento de Dados:** A propriedade "linha aérea" não está presente nos dados. Eu implementaria uma lógica para enriquecer os dados dos voos, buscando informações da companhia aérea a partir de outra fonte (API externa ou banco de dados local) com base no prefixo da matrícula da aeronave.
4. **Endpoint de Estatísticas:** Criaria um endpoint dedicado, como `/api/v1/flights/stats`, para centralizar dados agregados, como o número total de voos, o voo mais lucrativo, a rota mais frequente, etc.
5. **Testes de Integração:** Adicionaria testes de integração para validar o fluxo completo da API, desde a requisição HTTP até a resposta, garantindo que os controllers, services e a manipulação de dados funcionem corretamente em conjunto.

### Frontend

1. **Otimização de Performance para Listas Longas:** Para a lista de voos, implementaria a técnica de **virtualização** (ou "janelamento") com bibliotecas como `react-window` ou `react-virtualized`. Isso renderiza apenas os itens visíveis na tela, melhorando drasticamente a performance e o consumo de memória ao lidar com milhares de voos.
2. **Melhoria da Experiência do Usuário (UX):**
    - Adicionaria *skeletons* ou indicadores de carregamento (`loading states`) enquanto os dados dos voos são buscados na API.
    - Implementaria um tratamento de erros mais amigável, exibindo mensagens claras para o usuário caso a API falhe ou não retorne dados.
    - Desenvolveria uma interface de filtros e ordenação para que o usuário pudesse utilizar as novas funcionalidades do backend.
3. **Testes End-to-End (E2E):** Utilizaria ferramentas como Cypress ou Playwright para criar testes E2E que simulam a jornada do usuário, como navegar da lista para os detalhes de um voo, garantindo que a aplicação funcione como esperado do ponto de vista do usuário.

## 🚀 Como Executar

<details>

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/ludson96/teste-tecnico-pilops.git
    ```

### ⚙️ Backend

1. Pré-requisitos: Certifique-se de ter o Node.js instalado em sua máquina.

2. Navegue até a pasta `backend`:

    ```bash
    cd backend
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Execute o servidor:

    ```bash
    npm run dev
    ```

O backend estará rodando na porta 3001.

### ⚛️ Frontend

1. Navegue até a pasta `frontend`:

    ```bash
    cd frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Execute o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

O frontend estará rodando na porta 3000.

- Certifique-se de que o backend esteja rodando antes de iniciar o frontend, pois o frontend depende da API do backend para exibir os dados dos voos.

</details>

[HTML5-logo]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/pt-BR/docs/Web/HTML
[CSS3-logo]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/pt-BR/docs/Web/CSS
[JavaScript-logo]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[React-logo]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org
[RTL-logo]: https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white
[RTL-url]: https://testing-library.com/
[NodeJS-logo]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[Jest-logo]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io
[Git-logo]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com
[Express-logo]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com
[TypeScript-logo]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Nodemon-logo]: https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff&style=for-the-badge
[Nodemon-url]: https://www.npmjs.com/package/nodemon
[ESLint-logo]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[ts-node-logo]: https://img.shields.io/badge/ts--node-3178C6?logo=tsnode&logoColor=fff&style=for-the-badge
[ts-node-url]: https://www.npmjs.com/package/ts-node-dev
[Next.js-logo]: https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white
[Next.js-url]: https://nextjs.org/
[Tailwind-CSS-logo]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-CSS-url]: https://tailwindcss.com/
