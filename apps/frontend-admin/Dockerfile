# Stage 1 : build
FROM node:20-alpine AS build

# Créer un utilisateur non root dans le container
#RUN addgroup -S appgroup && adduser -S appuser -G appgroup
#USER appuser

WORKDIR /app

# Copier les fichiers package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Build production
RUN npm run build

# Stage 2 : production
FROM nginx:alpine

# Copier le build depuis le stage précédent
COPY --from=build /app/dist /usr/share/nginx/html

# Copier la config nginx custom (optionnel)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]
