FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN NODE_ENV=development npm i

# Copy the rest of the application code
COPY . .

# Run the build
RUN npm run build

FROM nginx:alpine

# Copy the built files to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
