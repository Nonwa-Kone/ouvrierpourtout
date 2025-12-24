ARG NODE_VERSION=24.12.0

#----------------------------------------
# BUILD STAGE
#----------------------------------------
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /frontend-partner

COPY package*.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

#----------------------------------------
# DEPLOYMENT IN STAGGING STAGE
#----------------------------------------
FROM nginx:alpine

COPY --from=build /frontend-partner/dist /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#----------------------------------------
# END
#----------------------------------------