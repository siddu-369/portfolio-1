# ── Production Node.js server ─────────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy application code
COPY index.js ./

EXPOSE 5000
CMD ["node", "index.js"]
