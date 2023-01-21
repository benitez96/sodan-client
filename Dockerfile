FROM node:19.4

# Crear un directorio para la aplicación
RUN mkdir -p /app
WORKDIR /app

# Copiar el código fuente de la aplicación
COPY . /app

# Instalar las dependencias
RUN yarn
