# Use the official lightweight Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /src/libs

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies (production mode for smaller images)
RUN npm install 

# Copy all project files into the container
COPY . .

# Define the command to start the application
CMD ["node", "dist/libs/app.js"]
