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
- npm

### Instalação

```bash
git clone <url-do-repositorio>
cd bytebank
npm install
```

### Desenvolvimento

```bash
npm run dev
# → http://localhost:3000
```

### Storybook

```bash
npm run storybook
# → http://localhost:6006
```

### Build de Produção

```bash
npm run build
npm start
```

---

## 📜 Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Next.js) |
| `npm run build` | Build otimizado de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | Lint com Biome |
| `npm run format` | Formatação automática com Biome |
| `npm run check-types` | Verificação de tipos TypeScript |
| `npm run check-all` | Pipeline completo (format → lint → types → build) |
| `npm run storybook` | Storybook em modo desenvolvimento |
| `npm run build-storybook` | Build estático do Storybook |

---

## 📁 Estrutura do Projeto

```
bytebank/
├── app/                          # Páginas e layout (App Router)
│   ├── layout.tsx                # Layout raiz (Header, Provider, Toaster)
│   ├── page.tsx                  # Home — hero section + transações recentes
│   ├── not-found.tsx             # Página 404
│   └── my-transactions/
│       ├── page.tsx              # Listagem completa com filtros e paginação
│       └── [id]/page.tsx         # Detalhes de uma transação
│
├── components/
│   ├── header/                   # Header, menu e formulário de nova transação
│   ├── sections/                 # Hero section e card de saldo disponível
│   ├── transactions/             # Listas, edição, exclusão, filtros e paginação
│   └── ui/                       # Componentes base (shadcn/ui)
│
├── context/                      # React Context — estado global + persistência
├── hooks/                        # Custom hooks (mobile, hydration, filtros URL)
├── helpers/                      # Utilitários (moeda, data, paginação, busca)
├── schema/                       # Schema de validação Zod
├── types/                        # Tipagens TypeScript
├── consts/                       # Constantes (itens por página, etc.)
├── stories/                      # Stories do Storybook
└── .storybook/                   # Configuração do Storybook
```

---

## 🧩 Modelo de Dados

```typescript
type TransactionENUM = 'deposit' | 'withdrawal'

interface Transaction {
  id: string          // UUID (crypto.randomUUID)
  title: string       // 3–30 caracteres
  description: string // até 100 caracteres
  type: TransactionENUM
  date: string        // data ISO
  amount: number      // valor numérico
  createdAt: string   // timestamp ISO de criação
}
```

---

## 📄 Licença

Projeto acadêmico desenvolvido para o **Tech Challenge** da FIAP.
