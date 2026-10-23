# Kurio — NFT Marketplace

Aplicação frontend de um marketplace de NFTs, desenvolvida como parte do desafio técnico da **Jungle Gaming**, com base em um design disponibilizado no Figma.

O projeto utiliza **React, TypeScript e Vite**, com foco em componentização, responsividade, gerenciamento de estado, integração com APIs simuladas, acessibilidade e testes automatizados.

## Status do projeto

**Desafio técnico entregue — projeto em evolução.**

A interface principal do marketplace está implementada, incluindo catálogo de NFTs, filtros, ordenação, paginação, seções promocionais, blog, rodapé e modal de autenticação.

O projeto continua recebendo melhorias visuais e funcionais.

**Importante:** o login, o cadastro e a autenticação social possuem interfaces e validações, mas ainda não estão conectados a um serviço real de autenticação.

## Funcionalidades

### Marketplace de NFTs

- Exibição de NFTs em cards.
- Filtragem por coleção, rede e faixa de preço.
- Combinação de múltiplos filtros.
- Ordenação por preço crescente e decrescente.
- Paginação dos resultados.
- Alternância entre abas do catálogo.
- Tratamento de estados sem resultados.
- Layout responsivo para diferentes tamanhos de tela.

### Página inicial

- Header com navegação responsiva e menu mobile.
- Hero com chamada principal.
- Seção de destaques.
- Catálogo de NFTs.
- Cards promocionais.
- Seção de blog com quatro artigos.
- Rodapé com navegação, redes sociais e newsletter.

### Autenticação — interface demonstrativa

- Modal responsivo com abas **Entrar** e **Criar conta**.
- Formulário de login com e-mail e senha.
- Formulário de cadastro com nome de usuário, e-mail, senha e confirmação de senha.
- Validação de campos obrigatórios.
- Validação de e-mail e tamanho mínimo da senha.
- Verificação de correspondência entre senha e confirmação.
- Controle para mostrar e ocultar a senha.
- Botões de autenticação com Google e Facebook.
- Fechamento do modal por botão, tecla Escape e interação com a área externa.
- Recursos de acessibilidade, incluindo identificação do diálogo e gerenciamento de foco.

As operações que dependem de um serviço externo apresentam mensagens informativas de indisponibilidade. Não há criação de conta ou autenticação real nesta versão.

## Tecnologias

| Tecnologia | Utilização |
| --- | --- |
| React 19 | Construção da interface |
| TypeScript 6 | Tipagem estática |
| Vite 8 | Ambiente de desenvolvimento e build |
| Tailwind CSS 4 | Estilização e responsividade |
| Radix UI | Primitivos de interface |
| Lucide React e React Icons | Ícones |
| TanStack Router | Roteamento |
| TanStack Query | Gerenciamento de consultas assíncronas |
| Axios | Cliente HTTP |
| Mock Service Worker (MSW) | Simulação de APIs |
| Socket.IO Client | Dependência preparada para integração em tempo real |
| Playwright | Testes end-to-end |
| ESLint | Análise estática de código |

## Pré-requisitos

- Node.js 24
- npm
- Git

Para clonar o repositório via SSH, é necessário ter uma chave SSH configurada na conta do GitHub.

## Instalação

Clone o repositório:

```bash
git clone git@github.com:gemaquejr/kurio.git
```

Acesse o diretório:

```bash
cd kurio
```

Instale as dependências:

```bash
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível, por padrão, em:

http://localhost:5173

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Verifica o TypeScript e gera o build de produção |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa o ESLint |
| `npm run test:e2e` | Executa os testes E2E com Playwright |

## Testes automatizados

O projeto utiliza **Playwright com Chromium** para validar as principais interações da aplicação.

Na última execução da suíte completa, **36 testes E2E foram aprovados**.

Os cenários cobrem:

- Navegação entre páginas e menu mobile.
- Exibição e responsividade do Hero.
- Integração HTTP simulada, incluindo sucesso e erro.
- Filtros combinados, ordenação e paginação do catálogo.
- Estados vazios do marketplace.
- Responsividade dos cards e filtros.
- Exibição das seções promocionais e do blog.
- Validação da newsletter.
- Abertura, fechamento e responsividade do modal de autenticação.
- Validação dos formulários de login e cadastro.
- Alternância entre as abas Entrar e Criar conta.
- Exibição e ocultação de senha.
- Mensagens de indisponibilidade dos serviços de autenticação.

Para instalar o Chromium utilizado nos testes:

```bash
npx playwright install chromium
```

Execute todos os testes:

```bash
npm run test:e2e
```

Para executar apenas os testes de autenticação:

```bash
npx playwright test tests/e2e/sign-in-modal.spec.ts tests/e2e/sign-up-modal.spec.ts
```

## Estrutura do projeto

```text
src/
├── assets/          # Recursos visuais
├── components/
│   ├── auth/        # Modal e formulários de autenticação
│   ├── home/        # Seções da página inicial
│   ├── layout/      # Header e Footer
│   └── ui/          # Componentes de interface
├── lib/             # Configurações compartilhadas
├── mocks/           # Configuração e handlers do MSW
├── routes/          # Rotas do TanStack Router
├── services/        # Comunicação com serviços externos
├── index.css        # Estilos globais
└── main.tsx         # Inicialização da aplicação

tests/
└── e2e/             # Testes automatizados com Playwright
```

## Integração com APIs

O projeto utiliza **Axios** como cliente HTTP e **TanStack Query** para gerenciamento dos estados das consultas.

Durante o desenvolvimento, o **Mock Service Worker (MSW)** permite simular respostas HTTP sem depender de um backend.

Existe uma rota de diagnóstico (`/dev-health`) para demonstrar cenários de sucesso e erro em requisições simuladas.

O **Socket.IO Client** faz parte das dependências do projeto, com conexão automática desativada. A integração em tempo real ainda não está implementada.

## Responsividade e acessibilidade

A interface foi desenvolvida considerando diferentes larguras de tela, incluindo dispositivos móveis e desktops.

O modal de autenticação possui identificação acessível, navegação por teclado e gerenciamento de foco.

Os testes automatizados verificam comportamentos responsivos e a ausência de rolagem horizontal em cenários selecionados.

## Limitações atuais

- Autenticação real ainda não integrada.
- Login com Google e Facebook disponível apenas como interface.
- Catálogo de NFTs alimentado por dados locais.
- Newsletter sem integração com serviço de inscrição.
- Integração em tempo real ainda não implementada.
- Alguns links e conteúdos demonstrativos ainda dependem de integração ou complementação.

## Referências

- [Repositório do Kurio](https://github.com/gemaquejr/kurio)
- [Desafio técnico da Jungle Gaming](https://github.com/junglegaming/frontend-challenge)
- [Design de referência no Figma](https://www.figma.com/design/Ff0SksUi7UFtPWUO8kyNtw/Frontend-Challenge?node-id=0-1)

## Considerações finais

O Kurio demonstra a construção de uma aplicação frontend com foco em organização de componentes, fidelidade visual, interações de interface, testes automatizados e boas práticas de desenvolvimento.

O projeto foi entregue como desafio técnico e permanece em evolução para aprimorar a experiência de uso e ampliar suas funcionalidades.
