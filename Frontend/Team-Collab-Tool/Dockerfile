FROM node:21-alpine AS build
 
ARG VITE_AUTH_BASE_URL
ENV VITE_AUTH_BASE_URL=http://collabspace-lb-1027424875.ap-south-1.elb.amazonaws.com
 
WORKDIR /app
 
COPY package*.json ./
RUN npm install
 
COPY . .
 
# Print file structure for debugging
RUN ls -R /app
 
# Run the build
RUN npm run build
 
FROM nginx:1-alpine-slim
 
COPY --from=build /app/dist /usr/share/nginx/html
 
COPY nginx.conf /etc/nginx/conf.d/default.conf
 
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]