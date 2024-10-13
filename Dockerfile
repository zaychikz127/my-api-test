# Use the official Bun image as the base
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4500

# Command to run the application
CMD ["bun", "server.js"]
