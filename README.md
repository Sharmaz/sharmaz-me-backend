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

4. Open `http://localhost:<PORT>` in your browser

### Running everything in Docker
```bash
docker compose up --build
```

This starts both MySQL and the API in containers. The API waits for MySQL to be healthy before starting.
