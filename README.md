Project to manage subscriptions on Igreja Batista Central Leste

## Getting Started

### Dependencies:

- [node](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)
- [next.js](https://nextjs.org/)
- [mysql](https://dev.mysql.com/)

## Running:

### 1. Install yarn project dependencies:

```bash
yarn
```

### 2. Run a postgres sql server and add url on .env:

```bash
docker run --name local-psql -v local_psql_data:/var/lib/postgresql/data -p 54320:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

```bash
DATABASE_URL="postgresql://user:password@address:port/database?schema=schema"
NEXT_PUBLIC_API_URL="NEXT URL"
```

Ps.: You can follow the `.env.template` file to create yours.

### 3. Init database
Run to init the database on choosed server:
`npx prisma migrate dev --name init` 

### 4. Create a bucket to upload photos.
Here we are using supabase storage: [Supabase Storage](https://supabase.com/docs/guides/storage).

### 5. Then, you can run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
