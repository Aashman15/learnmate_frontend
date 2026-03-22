# ---------- Stage 1: Build ----------
FROM node:23 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy source code
COPY . .

# Build production files
RUN npm run build
# Stage 2: Serve static build
FROM node:23

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy the Vite output (dist folder)
COPY --from=build /app/dist ./dist

EXPOSE 3000

# Serve the dist folder
CMD ["serve", "-s", "dist", "-l", "3000"]