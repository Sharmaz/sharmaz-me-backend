# sharmaz-me-backend
API for portfolio/resume at https://sharmaz.github.io/me/

## Development Setup

### Prerequisites
- Node.js >= 24
- Docker and Docker Compose

### Using Docker (recommended)

1. Copy `.env.example` to `.env` and fill in your values (use `root` as `DB_USER` for Docker MySQL)

2. Start MySQL:
```bash
docker compose up db
```

3. In another terminal, install dependencies and run the API:
```bash
npm install
npm run migrations:run
npm run migrations:run:seed
npm run dev
```

4. In another terminal, install client dependencies and run the React dev server:
```bash
npm run client:install
npm run client:dev
```

5. Open `http://localhost:5173` in your browser

### Running everything in Docker
```bash
docker compose up --build
```

This starts both MySQL and the API in containers. The React client is built automatically as part of the Docker image. The API waits for MySQL to be healthy before starting.
