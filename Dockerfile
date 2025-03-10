# Use alightweight Node.js image
FROM node:18-alpine

# Set the working directory for container
WORKDIR /src/libs

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy all project files into the container
COPY . .

# Command to start the application
CMD ["node", "dist/libs/app.js"]
