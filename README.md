# 💰 ByteBank — Controle Financeiro

**ByteBank** é uma aplicação web de controle financeiro pessoal desenvolvida como **Tech Challenge** da pós-graduação FIAP. A plataforma permite gerenciar transações financeiras (depósitos e retiradas) com saldo dinâmico, filtros avançados, paginação e persistência no navegador.

🔗 **Demo:** [bytebank-nu.vercel.app](https://bytebank-nu.vercel.app/)

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| **Criar transação** | Formulário com validação completa — título, descrição, tipo, data (calendar picker) e valor em R$ |
| **Editar transação** | Edição com campos pré-preenchidos (Dialog no desktop, Drawer no mobile) |
| **Excluir transação** | Remoção com diálogo de confirmação (Alert Dialog) |
| **Visualizar detalhes** | Página dedicada por transação (`/my-transactions/[id]`) |
| **Saldo dinâmico** | Cálculo automático (depósitos − retiradas) com opção de ocultar/exibir o valor |
| **Busca e filtros** | Busca textual multi-campo (título, data, valor) + filtro por tipo (Depósito / Retirada) via query params |
| **Paginação** | Navegação entre páginas (5 itens por página) com lógica de ellipsis |
| **Persistência local** | Dados salvos no `localStorage` via React Context (persistem entre reloads) |
| **Design responsivo** | Layout adaptativo para desktop e mobile (breakpoint 768px) |
| **Storybook** | Documentação visual e interativa de 15+ componentes com addon de acessibilidade |

---

## 🛠️ Stack Tecnológica

| Categoria | Tecnologias |
|---|---|
| **Framework** | Next.js 16 · React 19 · TypeScript 5 |
| **Estilização** | Tailwind CSS 4 · shadcn/ui · Radix UI · Lucide Icons |
| **Formulários e Validação** | React Hook Form · Zod 4 |
| **Estado** | React Context API + `localStorage` |
| **Testes** | Vitest · Playwright · Storybook Test Addon |
| **Qualidade de Código** | Biome (lint + format) · ESLint 9 |
| **Documentação** | Storybook 10 (com addon-docs e addon-a11y) |
| **Utilitários** | date-fns · clsx · tailwind-merge · react-hot-toast |

---

## 🚀 Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18

# 💰 ByteBank - Controle Financeiro

Aplicação web de controle financeiro pessoal desenvolvida como **Tech Challenge** da FIAP. Permite gerenciar transações de depósito e retirada, com filtros, paginação, edição, exclusão e persistência local.

[Acesse o ByteBank Deploy](https://bytebank-nu.vercel.app/)

## ✨ Funcionalidades

- **Adicionar transação** — formulário validado (título, tipo, data via calendário e valor em R$)
- **Editar transação** — altere qualquer transação existente com dados pré-preenchidos
- **Excluir transação** — remova transações da lista
- **Saldo dinâmico** — cálculo automático (depósitos − retiradas) e opção de ocultar valor
- **Filtros** — busca por texto (título, data, valor) e filtro por tipo (Depósito/Retirada)
- **Paginação** — navegação entre páginas (5 itens por página)
- **Persistência** — dados salvos no localStorage (Zustand)
- **Storybook** — documentação visual e interativa dos componentes

## 🛠️ Tecnologias & Bibliotecas

| Categoria      | Tecnologias principais                                 |
|---------------|-------------------------------------------------------|
| Framework     | Next.js 16, React 19, TypeScript                      |
| Estilização   | Tailwind CSS 4, shadcn/ui, Radix UI                   |
| Formulários   | React Hook Form, Zod                                  |
| Estado        | Zustand (persistência localStorage)                   |
| Utilitários   | date-fns, Lucide Icons, clsx, react-hot-toast         |
| Documentação  | Storybook 10                                          |
| Lint/Format   | Biome, ESLint                                         |

## 🚀 Como rodar o projeto

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

## 📁 Estrutura do projeto

```
├── app/                  # Páginas e rotas (Next.js App Router)
├── assets/               # Imagens e SVGs
├── components/
│   ├── header/           # Header, menu e formulário de nova transação
│   ├── sections/         # Hero section e card de saldo
│   ├── transactions/     # Listas, edição, filtros, paginação, loading
│   └── ui/               # Componentes base (shadcn/ui)
├── consts/               # Constantes globais
├── context/              # Contexto de transações (React Context)
├── helpers/              # Funções utilitárias (formatação, busca, etc.)
├── hooks/                # Hooks customizados
├── lib/                  # Funções utilitárias gerais
├── public/               # Arquivos estáticos
├── schema/               # Schemas de validação (Zod)
├── stories/              # Stories do Storybook
├── types/                # Tipagens TypeScript
├── .storybook/           # Configuração do Storybook
├── package.json          # Dependências e scripts
└── ...                   # Outros arquivos de configuração
```

## 📜 Scripts disponíveis

| Comando                | Descrição                                 |
|------------------------|-------------------------------------------|
| `npm run dev`          | Servidor de desenvolvimento Next.js       |
| `npm run build`        | Build de produção Next.js                 |
| `npm start`            | Servidor de produção Next.js              |
| `npm run lint`         | Linting com Biome/ESLint                  |
| `npm run format`       | Formatação automática com Biome           |
| `npm run check-types`  | Checagem de tipos TypeScript              |
| `npm run check-all`    | Formata, faz lint, checa tipos e build    |
| `npm run storybook`    | Inicia o Storybook                        |
| `npm run build-storybook` | Build estático do Storybook             |

---

Projeto desenvolvido para fins educacionais no Tech Challenge FIAP.
## 📄 Licença

Projeto acadêmico desenvolvido para o **Tech Challenge** da FIAP.
