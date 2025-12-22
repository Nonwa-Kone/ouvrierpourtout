FROM node:20-alpine

WORKDIR /app

# Installer dépendances système pour compiler bcrypt
RUN apk add --no-cache python3 make g++ 

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000
CMD ["node", "index.js"]
