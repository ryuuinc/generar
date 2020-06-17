FROM node:12.18.0-alpine

WORKDIR /generar

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE 50001

CMD ["npm", "start"]
