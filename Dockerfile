FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et lockfile
COPY package.json yarn.lock* ./

# Installer les dépendances
RUN yarn install || npm install

# Installer les dépendances
RUN npm install --save-dev @types/react-native

# Installer Expo CLI + tunnel
RUN npm install -g expo-cli @expo/ngrok@^4.1.0

# Copier le reste de l'application
COPY . .

# Exposer les ports nécessaires
EXPOSE 19000 19001 19002

# Lancer Expo via NPX (nouveau CLI)
CMD ["npx", "expo", "start", "--tunnel"]
