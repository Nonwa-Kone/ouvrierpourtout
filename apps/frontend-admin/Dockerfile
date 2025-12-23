# syntax=docker/dockerfile:1
ARG NODE_VERSION=24.12.0

###############
# Build stage
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

# Copy custom nginx configuration
# COPY infra/nginx/stagging.conf /etc/nginx/conf.d/default.conf

# Copy production build files
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]