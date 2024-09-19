FROM node:18-alpine AS build

# Set environment variable for React app during build
ARG VITE_AUTH_BASE_URL
ENV VITE_AUTH_BASE_URL=http://collabspace-lb-1027424875.ap-south-1.elb.amazonaws.com

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]