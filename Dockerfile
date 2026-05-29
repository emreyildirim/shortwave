# --- build stage: compile the Vite SPA ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Relay URL is baked in at build time. Override via Coolify build variable.
ARG VITE_RADIO_URL=wss://ws.shortwaveradio.online
ENV VITE_RADIO_URL=$VITE_RADIO_URL
RUN npm run build

# --- serve stage: nginx serving the static build ---
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
