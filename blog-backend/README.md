# Blog Backend (Node + Express + Prisma + PostgreSQL)

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL` and `ADMIN_API_KEY`
3. Create the database (e.g. `createdb blogdb`)
4. `npx prisma migrate dev --name init`
5. `npm run db:seed`   (optional sample data)
6. `npm run dev`       -> http://localhost:5000

## Endpoints
| Method | Path | Notes |
|---|---|---|
| GET | /api/posts | `?page=1&limit=9&category=<slug>&tag=<slug>&q=<search>` |
| GET | /api/posts/:idOrSlug | Full post + related posts |
| GET | /api/categories | With post counts |
| GET | /api/tags | With post counts |
| GET | /api/authors | |
| POST | /api/posts | Admin (x-api-key) |
| PUT | /api/posts/:id | Admin |
| DELETE | /api/posts/:id | Admin |
| POST | /api/authors, /api/categories | Admin |

List response: `{ data: [...], pagination: { page, limit, total, totalPages } }`

## Vite proxy
```js
server: { proxy: { '/api': 'http://localhost:5000' } }
```
