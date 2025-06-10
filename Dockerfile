# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy the rest of the application code
COPY . .

# Build the SvelteKit application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the application
# The PORT environment variable will be set by Cloud Run.
# SvelteKit with adapter-node by default listens to process.env.PORT or 3000.
# The 'start' script in package.json is 'node build'.
# The build output of adapter-node is a standalone Node server.
CMD ["npm", "start"]
