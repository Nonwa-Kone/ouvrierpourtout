# syntax=docker/dockerfile:1
ARG NODE_VERSION=24.12.0

#----------------------------------------
# BUILD STAGE
#----------------------------------------
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /frontend-admin

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

#----------------------------------------
# DEPLOYMENT IN STAGGING STAGE
#----------------------------------------
FROM nginx:alpine

# Copy production build files
COPY --from=build /frontend-admin/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
#----------------------------------------
# END
#----------------------------------------