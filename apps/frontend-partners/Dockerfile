ARG NODE_VERSION=24.12.0

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

COPY package*.json package-lock.json ./
RUN npm install --force

COPY . .
RUN npm run build

# Stage 2 : prod
FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]