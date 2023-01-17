FROM node:14

# Crear un directorio para la aplicación
RUN mkdir -p /app
WORKDIR /app

# Copiar los archivos necesarios para construir la aplicación
COPY package.json /app/
COPY yarn.lock /app/

# Instalar las dependencias
RUN yarn

# Copiar el código fuente de la aplicación
COPY . /app

# Establecer el comando para iniciar la aplicación en modo de desarrollo
CMD ["yarn", "dev", "--port", "3000", "--host"]
