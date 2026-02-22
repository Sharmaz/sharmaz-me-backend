FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/
RUN npm ci --only=production

COPY client/ ./client/
RUN cd client && npm ci && npm run build

COPY src/ ./src/

EXPOSE ${PORT:-3000}

CMD ["node", "src/index.js"]
