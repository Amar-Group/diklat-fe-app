# ===================================================
# Stage 1: deps — Install dependencies
# ===================================================
FROM oven/bun:1.3-alpine AS deps

WORKDIR /app

# Copy lockfile and manifest first for layer cache
COPY package.json bun.lock ./

# Install ALL dependencies (including devDeps needed for Next.js build)
RUN bun install --frozen-lockfile

# ===================================================
# Stage 2: builder — Build the Next.js app
# ===================================================
FROM oven/bun:1.3-alpine AS builder

WORKDIR /app

# Copy deps from previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy entire source
COPY . .

# Set env so Next.js standalone output is triggered
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js (produces .next/standalone + .next/static)
RUN bun run build

# ===================================================
# Stage 3: runner — Lean production image
# ===================================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Copy the standalone build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Next.js standalone entrypoint
CMD ["node", "server.js"]
