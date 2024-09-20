FROM node:18-alpine AS build

ARG VITE_AUTH_BASE_URL
ENV VITE_AUTH_BASE_URL=http://collabspace-lb-1027424875.ap-south-1.elb.amazonaws.com

WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

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
