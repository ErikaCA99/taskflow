FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN ./node_modules/.bin/prisma generate

# Expose port
EXPOSE 3000

# Start dev server
CMD ["npm", "run", "dev"]