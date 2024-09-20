FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker cache
COPY package.json package-lock.json ./


# Install dependencies
RUN NODE_ENV=development npm ci

# Copy the rest of the application code
COPY . .

ARG VITE_AUTH_BASE_URL
ENV VITE_AUTH_BASE_URL=http://collabspace-lb-1027424875.ap-south-1.elb.amazonaws.com

# Run the build
RUN npm run build

FROM nginx:alpine

# Copy the built files to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
