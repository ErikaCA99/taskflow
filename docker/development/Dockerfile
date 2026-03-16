FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start dev server
CMD ["npm", "run", "dev"]