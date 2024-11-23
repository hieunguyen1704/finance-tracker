# Use Node.js LTS version
FROM node:22

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install


# Copy Prisma files and generate the client
COPY prisma ./prisma
RUN npx prisma generate

# Copy all source files
COPY . .

# Run Prisma migrations during the build process
# RUN npx prisma migrate deploy

# Start the application
CMD ["npm", "run", "start"]
