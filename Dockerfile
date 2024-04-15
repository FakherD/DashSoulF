# Use a node base image
FROM node:16-alpine as build

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 80

# The default command to run nginx is fine, no need to override
