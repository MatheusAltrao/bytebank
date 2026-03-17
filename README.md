# 💰 ByteBank — Controle Financeiro

**ByteBank** é uma aplicação web de controle financeiro pessoal desenvolvida como **Tech Challenge** da pós-graduação FIAP. A plataforma permite gerenciar transações financeiras (depósitos e retiradas) com saldo dinâmico, filtros avançados, paginação e API REST integrada.

🔗 **Demo:** [bytebank-nu.vercel.app](https://bytebank-nu.vercel.app/)
🔗 **Github:** [github.com/MatheusAltrao/bytebank](https://github.com/MatheusAltrao/bytebank)

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Criar transação** | Formulário com validação completa — título, descrição, tipo, data (calendar picker) e valor em R$ |
| **Editar transação** | Edição com campos pré-preenchidos (Dialog no desktop, Drawer no mobile) |
| **Excluir transação** | Remoção com diálogo de confirmação (Alert Dialog) |
| **Visualizar detalhes** | Página dedicada por transação (`/my-transactions/[id]`) |
| **Saldo dinâmico** | Cálculo automático (depósitos − retiradas) com opção de ocultar/exibir o valor |
| **Busca e filtros** | Busca textual por título e valor + filtro por tipo (Depósito / Retirada) via query params |
| **Paginação** | Navegação entre páginas (5 itens por página) com lógica de ellipsis |
| **API REST** | Endpoints CRUD completos (`GET`, `POST`, `PATCH`, `DELETE`) com dados mockados em memória |
| **Skeleton loading** | Suspense boundaries com skeletons nas tabelas durante carregamento server-side |
| **Design responsivo** | Layout adaptativo para desktop e mobile (breakpoint 768px) |
| **Storybook** | Documentação visual e interativa de 15+ componentes com addon de acessibilidade |

---

## 🏗️ Arquitetura

A aplicação segue uma arquitetura **server-first** com Next.js App Router:

- **Server Components** — páginas e componentes de dados são server components async, buscando dados via API REST
- **Client Components** — apenas componentes interativos (formulários, filtros, botões de ação) são client components
- **API Route** (`/api/transactions`) — endpoint REST com dados mockados em memória (CRUD completo)
- **HTTP Layer** (`app/http/transactions.http.ts`) — camada padronizada de fetch para todas as chamadas ao backend
- **Suspense + Streaming** — skeletons renderizados instantaneamente enquanto os dados são carregados no servidor
- **`router.refresh()`** — após mutations (criar, editar, deletar), os server components são re-executados para refletir os dados atualizados
- **`useTransition`** — mutations são executadas dentro de transitions, com loading state nos botões e bloqueio de fechamento dos modais

---

## 🛠️ Stack Tecnológica

| Categoria | Tecnologias |
|---|---|
| **Framework** | Next.js 16 · React 19 · TypeScript 5 |
| **Estilização** | Tailwind CSS 4 · shadcn/ui · Radix UI · Lucide Icons |
| **Formulários e Validação** | React Hook Form · Zod 4 |
| **Data Fetching** | Next.js Server Components · API Routes · Fetch API |
| **Testes** | Vitest · Playwright · Storybook Test Addon |
| **Qualidade de Código** | Biome (lint + format) · ESLint 9 |
| **Documentação** | Storybook 10 (com addon-docs e addon-a11y) |
| **Utilitários** | date-fns · clsx · tailwind-merge · react-hot-toast |

---

## 🚀 Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- npm (ou yarn/pnpm)

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd bytebank

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicia o servidor Next.js em http://localhost:3000
npm run dev
```

### Storybook

```bash
# Inicia o Storybook em http://localhost:6006
npm run storybook
```

### Build de produção

```bash
# Gera o build otimizado
npm run build

# Inicia o servidor de produção
npm start
```

---

## 📁 Estrutura do projeto

```
├── app/
│   ├── api/transactions/   # API REST (CRUD completo com dados mockados)
│   ├── http/               # Camada HTTP padronizada (fetch wrappers)
│   ├── my-transactions/    # Página de todas as transações + detalhe por ID
│   ├── page.tsx            # Home (hero + transações recentes)
│   └── layout.tsx          # Layout raiz
├── assets/                 # Imagens e SVGs
├── components/
│   ├── header/             # Header, menu e formulário de nova transação
│   ├── sections/           # Hero section e card de saldo
│   ├── transactions/       # Listas, edição, filtros, paginação, skeletons
│   └── ui/                 # Componentes base (shadcn/ui)
├── helpers/                # Funções utilitárias (formatação, busca, etc.)
├── hooks/                  # Hooks customizados
├── lib/                    # Funções utilitárias gerais
├── schema/                 # Schemas de validação (Zod)
├── stories/                # Stories do Storybook
├── types/                  # Tipagens TypeScript
└── ...                     # Arquivos de configuração
```

---

## 🔌 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/transactions` | Lista transações (com filtros, paginação e saldo) |
| `GET` | `/api/transactions?recent=true` | Lista as 5 transações mais recentes |
| `GET` | `/api/transactions?id=<id>` | Busca transação por ID |
| `POST` | `/api/transactions` | Cria uma nova transação |
| `PATCH` | `/api/transactions` | Atualiza uma transação existente |
| `DELETE` | `/api/transactions?id=<id>` | Remove uma transação |

### Query params de listagem

| Param | Tipo | Descrição |
|-------|------|-----------|
| `q` | string | Busca por título ou valor |
| `type` | `deposit` \| `withdrawal` | Filtro por tipo |
| `page` | number | Página atual (padrão: 1) |
| `perPage` | number | Itens por página (padrão: 5) |

---

## 📜 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento Next.js |
| `npm run build` | Build de produção Next.js |
| `npm start` | Servidor de produção Next.js |
| `npm run lint` | Linting com Biome/ESLint |
| `npm run format` | Formatação automática com Biome |
| `npm run check-types` | Checagem de tipos TypeScript |
| `npm run check-all` | Formata, faz lint, checa tipos e build |
| `npm run storybook` | Inicia o Storybook |
| `npm run build-storybook` | Build estático do Storybook |

---

## 📄 Licença

Projeto acadêmico desenvolvido para o **Tech Challenge** da FIAP.
