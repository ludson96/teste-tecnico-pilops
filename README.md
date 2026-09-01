# ✈️ Pilops - Flight History

🌍 Read this in [English](README.en.md)

> Aplicação full stack desenvolvida como parte do desafio técnico para a vaga de **Engenheiro(a) de Software Fullstack (Estágio/Júnior)** na **Pilops**. O sistema permite aos pilotos virtuais gerenciar, visualizar e acompanhar todo o histórico de voos, rotas, matrículas e saldos financeiros de suas missões no simulador.

## 🌐 Deploy / Demonstração Online

Acesse a aplicação em produção:
👉 **[teste-tecnico-pilops.vercel.app](https://teste-tecnico-pilops-bgd4.vercel.app/flights)**

## 📝 Sobre o Projeto

O **Pilops Flight History** é uma solução completa para visualização e detalhamento de operações de voo. A aplicação consome uma base de dados estruturada de voos realizados, provendo uma API REST escalável com paginação inteligente no backend e uma interface web moderna, responsiva e de alta performance construída em Next.js e Tailwind CSS.

## 🖼️ Preview

<img src="./frontend/public/projeto.gif" alt="Demonstração do App" />

## ✨ Funcionalidades

### 💻 Frontend
- **Feed com Scroll Infinito (Infinite Scrolling)**: Carregamento contínuo de novos lotes de voos sob demanda via `IntersectionObserver`, garantindo navegação suave sem travamentos.
- **Visualização de Detalhes do Voo**: Página dedicada (`/flights/[id]`) exibindo:
  - Resumo de rota (origem e destino).
  - Aeronave e matrícula.
  - Recompensas da missão (ganhos totais, XP obtido, bônus de missão).
  - Demonstração de custos operacionais (combustível, taxas aeroportuárias e manutenção).
- **Design System Temático e Responsivo**:
  - Dark mode nativo com paleta de cores harmoniosa em tons escuros e acentos dourados/amarelos.
  - Tipografia configurada com **Sora** (headings) e **Manrope** (dados e textos).
  - Favicon customizado em SVG vetorial padronizado com o emblema da marca.
  - Totalmente adaptável para telas móveis (Smartphones), tablets e desktops.

### ⚙️ Backend (API REST)
- **Listagem Paginada de Voos**: Paginação dinâmica com cálculo automático de páginas e total de registros.
- **Detalhes por Voo**: Busca otimizada por identificador único (`id`).
- **Cálculo de Saldo Consolidado**: Endpoint analítico que soma os saldos de todas as operações com arredondamento monetário preciso.
- **Suporte a CORS & ES Modules**: Configurado para integração segura e rápida com o frontend.

## 🌐 API Endpoints

A API roda por padrão em `http://localhost:3001` e fornece as seguintes rotas:

| Método | Endpoint | Descrição | Exemplo de Parâmetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/flights` | Lista os voos com paginação | `?page=1&limit=10` |
| `GET` | `/flights/:id` | Retorna os detalhes completos de um voo específico | `/flights/FL-001` |
| `GET` | `/flights/total-balance` | Retorna o saldo acumulado de todos os voos | — |

<details>
<summary>Exemplo de resposta da rota <code>GET /flights?page=1&limit=2</code></summary>

```json
{
  "currentPage": 1,
  "totalPages": 10,
  "itemsPerPage": 2,
  "totalItems": 20,
  "data": [
    {
      "id": "FL-001",
      "aircraft": {
        "name": "Cessna 172 G1000",
        "registration": "PR-PNK",
        "airline": "Pilops Academy"
      },
      "flightData": {
        "date": "2025-07-22",
        "balance": 1065,
        "route": {
          "from": "SBRJ",
          "to": "SBFZ"
        },
        "xp": 445,
        "missionBonus": 0
      }
    }
  ]
}
```
</details>

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia |
| :--- | :--- |
| **Frontend** | [![Next.js][Next.js-logo]][Next.js-url] [![React][React-logo]][React-url] [![TypeScript][TypeScript-logo]][TypeScript-url] [![Tailwind-CSS][Tailwind-CSS-logo]][Tailwind-CSS-url] |
| **Backend** | [![NodeJS][NodeJS-logo]][NodeJS-url] [![Express][Express-logo]][Express-url] [![TypeScript][TypeScript-logo]][TypeScript-url] |
| **Qualidade & Dev** | [![Jest][Jest-logo]][Jest-url] [![ESLint][ESLint-logo]][ESLint-url] [![Git][Git-logo]][Git-url] |

## 📁 Estrutura do Repositório

```text
teste-tecnico-pilops/
├── backend/                    # API REST em Node.js + Express + TypeScript
│   ├── src/
│   │   ├── controllers/        # Controladores que tratam req/res HTTP
│   │   ├── data/               # Mock e massa de dados (flightHistory.json)
│   │   ├── routes/             # Definição e roteamento das URLs (/flights)
│   │   ├── services/           # Regras de negócio e paginação
│   │   ├── app.ts              # Setup do app Express e middlewares
│   │   └── server.ts           # Inicialização do servidor na porta 3001
│   ├── tests/                  # Suíte de testes unitários com Jest
│   ├── tsconfig.json           # Configurações TypeScript do backend
│   └── package.json
│
├── frontend/                   # Aplicação Web em Next.js 15
│   ├── public/                 # Favicons, logos e ícones vetoriais SVG
│   ├── src/
│   │   ├── api/                # Clientes de comunicação HTTP (fetch) com o backend
│   │   ├── app/                # Estrutura de rotas do Next.js (App Router)
│   │   │   ├── flights/        # Página principal e rota dinâmica [id]
│   │   │   ├── layout.tsx      # Layout raiz com fontes e metadados
│   │   │   └── globals.css     # Estilos globais e integração Tailwind CSS
│   │   ├── components/         # Componentes reutilizáveis (Card, Header, BackButton)
│   │   ├── interfaces/         # Tipos e interfaces TypeScript
│   │   └── utils/              # Funções utilitárias (formatação de data e moeda)
│   ├── tsconfig.json           # Configurações TypeScript do frontend
│   └── package.json
│
└── README.md                   # Documentação do projeto
```

## 💡 Decisões Técnicas

1. **Separação em Camadas (Controller-Service-Data)**:
   - Os **Controllers** são responsáveis exclusivamente por receber a requisição HTTP, validar parâmetros da query ou rota e formatar a resposta.
   - Os **Services** isolam o processamento dos dados (fatiamento de arrays para paginação, busca por id, somatórios). Isso mantém o código desacoplado e de fácil cobertura por testes unitários.

2. **Backend com ES Modules Nativos (`"type": "module"`)**:
   - Todo o código backend foi configurado para utilizar ES Modules (`import`/`export`) nativamente com TypeScript e `tsx`. Isso garante um padrão moderno alinhado ao frontend e suporte à sintaxe de *Import Attributes* (`with { type: "json" }`).

3. **Infinite Scroll com `IntersectionObserver`**:
   - Ao invés de uma paginação tradicional com botões que exige cliques constantes, a listagem monitora o último item renderizado via `IntersectionObserver` ref callback. Ao se aproximar do final da página, busca a próxima página do backend e concatena os resultados de forma fluida.

4. **Next.js 15 App Router & Server/Client Components**:
   - Utilização do modelo moderno de componentes do React 19 / Next.js 15, separando componentes com interatividade de cliente (`"use client"` no feed de scroll) e aproveitando renderização otimizada para os detalhes do voo.

5. **Tipografia e Otimização de Fontes com `next/font`**:
   - Uso de `next/font/google` para injetar variáveis CSS (`--font-sora`, `--font-manrope`) sem impacto de bloqueio na renderização ou downloads desnecessários no client-side.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** instalado (versão 18.x ou superior recomendada).
- **npm** ou **yarn**.

### 1. Clonar o Repositório
```bash
git clone https://github.com/ludson96/teste-tecnico-pilops.git
cd teste-tecnico-pilops
```

### 2. Executar o Backend

Abra um terminal na raiz do projeto e execute:

```bash
# 1. Acesse o diretório do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor em modo de desenvolvimento
npm run dev
```

> 🟢 O backend estará disponível em: `http://localhost:3001`

*(Opcional) Para executar os testes do backend:*
```bash
npm test
```

### 3. Executar o Frontend

Abra um **segundo terminal** e execute:

```bash
# 1. Acesse o diretório do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

> 🟢 A aplicação estará disponível em: `http://localhost:3000`

## 👨‍💻 Autor

Desenvolvido por **Ludson Pereira**  
- [GitHub](https://github.com/ludson96)
- [LinkedIn](https://www.linkedin.com/in/ludson-pereira/)

[Next.js-logo]: https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white
[Next.js-url]: https://nextjs.org/
[React-logo]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org
[TypeScript-logo]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Tailwind-CSS-logo]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-CSS-url]: https://tailwindcss.com/
[NodeJS-logo]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[Express-logo]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com
[Jest-logo]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io
[ESLint-logo]: https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[Git-logo]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com
