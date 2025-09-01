FROM node:20.11.1-alpine AS build

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Copying source files
COPY . ./
RUN npm install --registry="https://mirror-npm.runflare.com"
RUN npm run build

# Production image
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration to default conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/404.html /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
