## Finalidade do template

Ter um template com uma estrutura pré configurada para iniciar uma api.

## Conjunto de ferramentas

- **`Fastify`** (https://github.com/fastify/fastify#readme)

- **`TypeORM`** (https://typeorm.io/#/)

- **`Argon2`** (https://github.com/ranisalt/node-argon2#readme)()

- **`JWT`** (https://github.com/auth0/node-jsonwebtoken#readme)

- **`Pino`** (https://github.com/pinojs/pino#readme)

- **`Jest`** (https://jestjs.io/docs/en/cli)

- **`Swagger`** (https://github.com/fastify/fastify-swagger#readme)

## Estrutura do projeto

- app
  - Controller
  - Error
  - Events
  - Middleware
  - Domain
    - Models
    - Repositories
    - Services
  - Provider
  - Singleton
- infra
  - Config
  - Database
    - Migrations
  - Routes
  - Server
- tests
- index.ts

## Iniciar o backend

- configure no arquivo .env:

  - a conexão do banco de dados
  - uma string para hash

- yarn ou npm install.

- (yarn ou npm run) dev.

## Configuração do Template

- O banco de dados pre-definido PostgreSql e migration para utilizar UUID.

- Configuração de server para graceful shutdown.

  - Referencias:

    - Video `Waldemar Neto Dev Lab` (https://www.youtube.com/watch?v=uwG7_bap5MQ&list=PLz_YTBuxtxt6_Zf1h-qzNsvVt46H8ziKh&index=31).

    - Artigo `Nairi Harutyunyan` (https://hackernoon.com/graceful-shutdown-in-nodejs-2f8f59d1c357).

- Logger utilizando Pino.

- Hash utilizando argon2.

- Token para autenticação utilizando jsonwebtoken.

- Events utilizando events do próprio node.

- Uma pasta contendo imports de classes singleton, onde o servidor já importa na inicialização.

## Build

- yarn build

## Observações

- A estrutura organizacional do template foi pensando em pontos do DDD sobre minha interpretação.

- O template tem um acoplamento com a biblioteca TypeOrm que fere os princípios do DDD, mas para um inicio de api pode ser um mal controlado.

- O TypeOrm pode ser utilizado como Data Mapper ou Active Record, se no caso a aplicação for simples, uma sugestão de uso do template, opte por utilizar o modo de Active Record e estruture a pasta app na melhor maneira para seu objetivo.
