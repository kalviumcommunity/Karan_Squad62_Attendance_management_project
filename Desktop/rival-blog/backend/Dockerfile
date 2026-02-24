FROM node:18-alpine

WORKDIR /app

# Install backend deps
COPY backend/package*.json ./
RUN npm install

# Copy source
COPY backend/ ./

# Generate Prisma client
RUN npx prisma generate

# Build
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/main"]
