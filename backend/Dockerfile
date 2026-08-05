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

# Start-Befehl: Wendet Prisma-Migrationen an, führt das Seeding aus und startet Express
CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed.js && node server.js"]