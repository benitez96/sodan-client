# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine as development
ENV NODE_ENV development
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]
