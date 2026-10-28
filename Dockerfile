# syntax=docker/dockerfile:1

# The site is fully static: build dist/ with Node + Bun, then serve it from
# an unprivileged nginx image that carries no Node, Bun, or source code.

ARG NODE_VERSION=24
ARG BUN_VERSION=1.4.4
ARG NGINX_VERSION=1.29

# Bun binary only (musl build, to match the Alpine Node image below).
FROM oven/bun:${BUN_VERSION}-alpine AS bun

# ---- deps: install from the lockfile, cached separately from the source ----
FROM node:${NODE_VERSION}-alpine AS deps
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
	bun install --frozen-lockfile

# ---- build: astro build -> /app/dist ----
FROM deps AS build
ENV ASTRO_TELEMETRY_DISABLED=1
COPY . .
RUN bun run build

# ---- runtime: static files behind nginx, running as a non-root user ----
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION}-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
USER nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
