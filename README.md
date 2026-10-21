# Kurio — NFT Marketplace

Aplicação frontend de um marketplace de NFTs, desenvolvida como parte do desafio técnico da Jungle Gaming.

O projeto utiliza React, TypeScript e Vite, com foco em componentização, organização de código, responsividade, integração com APIs e testes automatizados.

## Status

**Em desenvolvimento — Meta 1: fundação técnica.**

A infraestrutura inicial está implementada. As telas e funcionalidades do marketplace serão desenvolvidas nas próximas etapas, seguindo a referência do Figma.

## Tecnologias

- React 19 e TypeScript 6
- Vite 8
- Tailwind CSS 4
- shadcn/ui e Radix UI
- TanStack Router
- TanStack Query
- Axios
- Mock Service Worker (MSW)
- Socket.IO Client
- Playwright
- ESLint

## Pré-requisitos

- Node.js 24
- npm

## Instalação

Clone o repositório e instale as dependências:

```bash
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

http://localhost:5173

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verifica o TypeScript e gera o build |
| `npm run preview` | Visualiza o build de produção |
| `npm run lint` | Executa o ESLint |
| `npm run test:e2e` | Executa os testes E2E com Playwright |

Para instalar o navegador utilizado nos testes:

```bash
npx playwright install chromium
```

## Estrutura do projeto

```text
src/
├── assets/         # Recursos visuais
├── components/     # Componentes reutilizáveis
│   └── ui/         # Componentes de interface
├── lib/            # Configurações e clientes compartilhados
├── mocks/          # Handlers e configuração do MSW
├── routes/         # Rotas do TanStack Router
├── services/       # Comunicação com serviços externos
├── index.css       # Estilos globais
└── main.tsx        # Inicialização da aplicação

tests/
└── e2e/            # Testes automatizados com Playwright
```

## Integração com APIs

O Axios centraliza as requisições HTTP, enquanto o TanStack Query gerencia os estados das consultas.

Durante o desenvolvimento, o MSW intercepta requisições simuladas, permitindo validar cenários de carregamento, sucesso e erro sem depender de um backend.

O Socket.IO Client está configurado com conexão automática desativada. A integração em tempo real será implementada nas próximas etapas.

## Testes

Os testes E2E utilizam Playwright com Chromium.

A cobertura inicial inclui:

- Navegação entre a página inicial e a página Sobre.
- Consulta HTTP simulada com sucesso.
- Tratamento de erro HTTP simulado.

Execute:

```bash
npm run test:e2e
```

## Referências

- [Desafio técnico da Jungle Gaming](https://github.com/junglegaming/frontend-challenge)
- [Design de referência no Figma](https://www.figma.com/design/Ff0SksUi7UFtPWUO8kyNtw/Frontend-Challenge?node-id=0-1)

## Observações

Este projeto está em desenvolvimento. A interface e as funcionalidades finais do marketplace ainda não estão concluídas.
