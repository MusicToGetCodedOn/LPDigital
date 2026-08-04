# Base Image
FROM node:20-alpine

# Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Abhängigkeiten kopieren und installieren
COPY package*.json ./
RUN npm ci

# Prisma Schema kopieren und Client generieren
COPY prisma ./prisma/
RUN npx prisma generate

# Restlichen Code kopieren
COPY . .

# Port freigeben
EXPOSE 5000

# Start-Befehl: Synchronisiert DB-Schema und startet den Server
# (Tipp: 'seed.js' nur ausführen, wenn die DB leer ist, oder via separatem Befehl)
CMD ["sh", "-c", "npx prisma db push && node server.js"]