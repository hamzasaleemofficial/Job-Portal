#Mutistage Backend Docker files

# Stage 1: Install dependencies
FROM node:22-alpine AS builder

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Production image
FROM node:22-alpine

WORKDIR /backend

# Copy only required files
COPY --from=builder /backend ./

#Remove dev dependencies
RUN npm prune --omit=dev

EXPOSE 5000

CMD ["npm", "start"]
