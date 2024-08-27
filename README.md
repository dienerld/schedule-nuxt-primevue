# Laundry Schedule

Projeto para prática de desenvolvimento com [Nuxt](https://nuxt.com/) e [PrimeVue](https://primevue.org) aplicando conceitos de building blocks separando módulos de modo que possa ser reaproveitados em outros projetos.

O projeto utiliza o backend do próprio nuxt com as server routes para salvar os dados em um banco de dados sqlite(TursoDB)  e drizzle como o orm para facilitar a comunicação com o banco de dados. Todas os dados são buscados de modo que explore as funcionalidades do Nuxt para aplicar geração de paginas dinâmicas e renderizadas no backend para melhorar performance e otimização de SEO.

## Sobre o Projeto

Aplicativo para agendamento de uma lavanderia de condomínio. O objetivo do app é organizar a agenda da lavanderia evitando conflitos de utilização das lavadoras e simplificando tanto o agendamento quanto a visualização da disponibilidade de horários.

## Tecnologias

- [Nuxt](https://nuxt.com/)
- [PrimeVue](https://primevue.org)
- [TailwindCSS](https://tailwindcss.com)
- [TursoDB](https://turso.tech)
- [Drizzle](https://drizzle.org)

## Como executar

Para executar o projeto é necessário ter um runtime JS que o Nuxt suporte e as credenciais para acessar o banco de dados.

### Runtime JS

- [NodeJS](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)

### Banco de dados

- [SQLite](https://www.sqlite.org/index.html)
- [TursoDB](https://turso.tech)

### Instalação

1. Clone o repositório
2. Instale as dependências

```bash
pnpm install
```

3. Crie um arquivo `.env` com as credenciais do banco de dados

```bash
NUXT_SESSION_PASSWORD=senha-para-session
TURSO_DATABASE_URL=url-do-turso
TURSO_AUTH_TOKEN=token-do-turso
HASH_SALT=8
HASH_SEED=senha-para-seed
```

4. Execute o projeto

```bash
npm run dev
```

5. Acesse a aplicação em `http://localhost:3000`

---

## Funcionalidades

- 🟢 Funcionalidade implementada
- 🔴 Funcionalidade não implementada
- 🟡 Funcionalidade em progresso
- 🟣 Funcionalidade não implementada e não planejada

### Reservas / Agendamentos

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Reservar lavadora | Reserva uma lavadora para um período de dia específico | 🟢 |
| Excluir reserva | Exclui uma reserva de lavadora | 🟢 |
| Alterar reserva | Exclui uma reserva de lavadora | 🔴 |
| Visualizar reservas | Visualiza reservas passadas e futuras | 🟢 |
| Visualizar disponibilidade | Visualiza disponibilidade de horários para a lavadora | 🟢 |

### Usuários

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Cadastrar usuário | Cadastro feito via seed para banco de dados | 🟢 |
| Editar usuário | Altera a informação de um usuário | 🟢 |
| Excluir usuário | Exclui um usuário | 🟣 |
| Visualizar usuários | Visualiza usuários cadastrados |🟣 |

### Lavadoras

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Cadastrar lavadora | Cadastrar uma lavadora | 🔴 |
| Alterar lavadora | Altera a lavadora | 🔴 |
| Visualizar lavadoras | Visualiza lavadoras cadastradas | 🔴 |

---
Desenvolvido por [Diener Dornelas](https://github.com/dienerld)
