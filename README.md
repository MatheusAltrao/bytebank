# 💰 ByteBank - Controle Financeiro

Aplicação web de controle financeiro pessoal desenvolvida como **Tech Challenge** da FIAP. Permite gerenciar transações de depósito e retirada com persistência local, filtros e paginação.

[Bytebank Deploy](https://bytebank-nu.vercel.app/)

## ✨ Funcionalidades

- **Adicionar transação** — formulário com validação (título, tipo, data via calendário e valor em R$)
- **Editar transação** — altera qualquer transação existente com os dados pré-preenchidos
- **Excluir transação** — remove uma transação da lista
- **Saldo dinâmico** — calcula automaticamente (depósitos − retiradas) e permite ocultar o valor
- **Filtros** — busca por texto (título, data, valor) e filtro por tipo (Depósito / Retirada)
- **Paginação** — navegação entre páginas com 5 itens por página
- **Persistência** — dados salvos no localStorage via Zustand (persistem entre reloads)
- **Storybook** — documentação visual e interativa de todos os componentes

## 🛠️ Tecnologias

| Categoria | Tecnologias |
|-----------|------------|
| Framework | Next.js 16, React 19, TypeScript |
| Estilização | Tailwind CSS 4, shadcn/ui, Radix UI |
| Formulários | React Hook Form, Zod |
| Estado | Zustand (com persist/localStorage) |
| Documentação | Storybook 10 |
| Utilitários | date-fns, Lucide Icons |

## 🚀 Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- npm (ou yarn / pnpm)

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd projeto-financeiro

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
├── app/                  # Páginas e layout (App Router)
├── components/
│   ├── header/           # Header e formulário de nova transação
│   ├── sections/         # Hero section e card de saldo
│   ├── transactions/     # Lista, edição e componentes de transação
│   └── ui/               # Componentes base (shadcn/ui)
├── helpers/              # Funções utilitárias (formatação de moeda, data, etc.)
├── schema/               # Schemas de validação (Zod)
├── store/
│   └── transactions/     # Store Zustand (estado, ações, dados iniciais)
├── stories/              # Stories do Storybook
├── types/                # Tipagens TypeScript
└── .storybook/           # Configuração do Storybook
```

## 📜 Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | Linting com ESLint |
| `npm run storybook` | Inicia o Storybook |
| `npm run build-storybook` | Build estático do Storybook |
