FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the app (env vars will be injected at runtime)
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
