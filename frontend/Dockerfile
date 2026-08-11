# --- Stage 1: Build ---
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Empfange die API-URL dynamisch als Build-Argument aus Docker Compose
ARG VITE_API_BASE_URL
ARG VITE_GIT_COMMIT_HASH
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_GIT_COMMIT_HASH=$VITE_GIT_COMMIT_HASH

RUN npm run build

# --- Stage 2: Production Webserver ---
FROM nginx:alpine

# Kopiere das fertige Build-Ergebnis in das Nginx-Verzeichnis
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Eigene Nginx-Config für Single Page Applications (React Router) kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]