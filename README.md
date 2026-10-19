# Pizzaria Backend

API REST para gerenciamento de uma pizzaria. O backend oferece autenticação,
controle de acesso, cadastro de categorias e produtos, upload de imagens,
criação e acompanhamento completo de pedidos.

## Status

**Projeto concluído.**

## Tecnologias

- Node.js;
- TypeScript;
- Express 5;
- PostgreSQL;
- Prisma 7 com `@prisma/adapter-pg`;
- Zod para validação de entradas;
- JWT para autenticação;
- bcryptjs para hash de senhas;
- Multer para recebimento de arquivos;
- Cloudinary para armazenamento de banners;
- CORS;
- dotenv;
- tsx para execução em desenvolvimento.

## Arquitetura

O projeto usa uma organização em camadas:

```text
Rotas
  -> Middlewares
  -> Controllers
  -> Services
  -> Prisma Client
  -> PostgreSQL
```

- `src/routes.ts`: registro das rotas;
- `src/controllers/`: entrada e resposta HTTP;
- `src/services/`: regras de negócio e acesso ao banco;
- `src/schemas/`: validação com Zod;
- `src/middlewares/`: autenticação, autorização e validação;
- `src/prisma/`: instância compartilhada do Prisma;
- `prisma/`: schema e migrations do banco.

## Configuração

### Pré-requisitos

- Node.js instalado;
- PostgreSQL disponível;
- banco criado;
- conta e credenciais do Cloudinary para upload de imagens.

### Instalação

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pizzaria?schema=public"
JWT_SECRET="uma-chave-secreta-forte"
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"
```

Não versione o arquivo `.env` nem compartilhe seus valores.

Execute as migrations e gere o cliente Prisma conforme o ambiente:

```bash
npx prisma migrate deploy
npx prisma generate
```

Para desenvolvimento:

```bash
npm run dev
```

O servidor inicia na porta definida em `PORT` ou na porta `3333`.

## Autenticação

As rotas protegidas exigem o header:

```text
Authorization: Bearer <token>
```

O token é obtido em `POST /session`, é assinado com `JWT_SECRET` e possui
validade de 30 dias. Rotas administrativas também exigem um usuário com papel
`ADMIN`.

## Funcionalidades e endpoints

Todos os endpoints abaixo partem da raiz da API e não possuem prefixo global.

### Usuários e sessão

#### `POST /users`

Cria um usuário com papel padrão `STAFF`.

```json
{
  "name": "Maria",
  "email": "maria@example.com",
  "password": "123456"
}
```

#### `POST /session`

Autentica um usuário e retorna seus dados e um token JWT.

```json
{
  "email": "maria@example.com",
  "password": "123456"
}
```

#### `GET /me`

Retorna os dados do usuário autenticado.

### Categorias

#### `POST /category`

Cria uma categoria. Exige autenticação e papel `ADMIN`.

```json
{
  "name": "Pizzas"
}
```

#### `GET /category`

Lista as categorias. Exige autenticação.

#### `GET /category/product?category_id=<id>`

Lista os produtos vinculados à categoria informada. Exige autenticação e
retorna produtos ativos e arquivados.

### Produtos

#### `POST /product`

Cria um produto. Exige autenticação e papel `ADMIN`.

O formato é `multipart/form-data`, com os campos:

| Campo | Descrição |
|---|---|
| `name` | Nome do produto |
| `price` | Preço numérico |
| `description` | Descrição |
| `category_id` | ID de uma categoria existente |
| `file` | Imagem JPG, JPEG ou PNG de até 4 MB |

O banner é enviado para o Cloudinary.

#### `GET /products`

Lista produtos ativos por padrão.

```text
GET /products
GET /products?disabled=false
GET /products?disabled=true
```

O parâmetro `disabled` aceita somente `true` ou `false`.

#### `DELETE /product?product_id=<id>`

Arquiva um produto. Exige autenticação e papel `ADMIN`. A operação é lógica:
o produto permanece no banco e recebe `disabled: true`.

### Pedidos

#### `POST /order`

Cria um pedido em estado de rascunho.

```json
{
  "table": 4,
  "name": "Nome do cliente"
}
```

`table` deve ser um inteiro positivo e `name` é obrigatório.

#### `GET /orders`

Lista pedidos autenticados e seus itens.

```text
GET /orders
GET /orders?draft=true
GET /orders?draft=false
```

O filtro `draft` diferencia pedidos enviados da cozinha e pedidos ainda em
rascunho, conforme o estado gravado no banco.

#### `GET /order/detail?order_id=<id>`

Retorna todos os detalhes de um pedido específico, incluindo seus itens e os
dados dos produtos associados.

#### `POST /order/add`

Adiciona um produto a um pedido.

```json
{
  "amount": 2,
  "order_id": "id-do-pedido",
  "product_id": "id-do-produto"
}
```

O pedido deve existir e o produto precisa estar ativo.

#### `DELETE /order/remove?item_id=<id>`

Remove um item específico da tabela de itens. O valor enviado deve ser o
`id` do item, não o `order_id` nem o `product_id`.

#### `PUT /order/send`

Envia o pedido para a cozinha, altera `draft` para `false` e atualiza o nome
do cliente.

```json
{
  "order_id": "id-do-pedido",
  "name": "Nome atualizado"
}
```

#### `PUT /order/finish`

Finaliza o pedido e altera `status` para `true`.

```json
{
  "order_id": "id-do-pedido"
}
```

#### `DELETE /order?order_id=<id>`

Remove um pedido existente. Os itens relacionados são removidos em cascata
pelo relacionamento definido no Prisma.

## Modelo de dados

- `User`: usuários, credenciais e papéis `STAFF` ou `ADMIN`;
- `Category`: categorias de produtos;
- `Product`: produtos, preço, descrição, banner e status `disabled`;
- `Order`: mesa, cliente, estado `draft` e estado `status`;
- `Item`: quantidade, pedido relacionado e produto relacionado.

As relações entre `Product` e `Category`, `Item` e `Order`, e `Item` e
`Product` usam exclusão em cascata conforme o schema Prisma.

## Validação e erros

As entradas são validadas com Zod antes de chegar aos controllers. Falhas de
validação retornam `400 Bad Request`. Falta ou invalidade do token retorna
`401 Unauthorized`. Erros de domínio são tratados pelo middleware global do
Express.

## Desenvolvimento e manutenção

O código gerado em `src/generated/prisma/` não deve ser editado manualmente.
Alterações de banco devem ser feitas no `prisma/schema.prisma` e registradas
por migrations.

Antes de publicar, recomenda-se:

```bash
npx tsc --noEmit
npx prisma migrate deploy
npm install --omit=dev
```

Em produção, use uma chave JWT forte, restrinja as origens do CORS, mantenha
as credenciais fora do repositório e configure HTTPS.
