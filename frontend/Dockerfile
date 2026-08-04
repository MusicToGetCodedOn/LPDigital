# --- Stage 1: Build ---
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Übergabe der API-URL beim Build
ENV VITE_API_BASE_URL=http://192.168.1.130:5000
RUN npm run build

# --- Stage 2: Production Webserver ---
FROM nginx:alpine

# Kopiere das fertige Build-Ergebnis in das Nginx-Verzeichnis
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Eigenen Nginx-Config für Single Page Applications (React Router) kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]