# Stage 1: Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files only (for better cache efficiency)
COPY package*.json ./

# Install dependencies with frozen lockfile
RUN npm ci --frozen-lockfile --omit=dev

# Copy source code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Runtime stage
FROM node:20-alpine

WORKDIR /app

# Set NODE_ENV for optimal performance
ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose port for Next.js
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start Next.js in production mode
CMD ["npm", "start"]
