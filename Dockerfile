# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Install ALL dependencies (including devDependencies for the build)
RUN npm install

# Copy the rest of the application code
COPY . .

# Prepare SvelteKit (generates .svelte-kit/tsconfig.json etc.)
RUN npm run prepare

# Build the SvelteKit application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the application
CMD ["npm", "start"]
