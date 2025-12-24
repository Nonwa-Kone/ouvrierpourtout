ARG NODE_VERSION=24.12.0

#----------------------------------------
# PHASE DE BUILD
#----------------------------------------
FROM node:${NODE_VERSION}-alpine as build

WORKDIR /frontend_public

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

#----------------------------------------
# PHASE DE DEPLOYMENT EN STAGGING
#----------------------------------------
FROM nginx:alpine

COPY --from=build /frontend_public/build /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#---------------------------------------
# END
#---------------------------------------