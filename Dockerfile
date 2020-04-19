FROM node:12.16.2-alpine

WORKDIR /generar

COPY package*.json ./

RUN npm ci --production

COPY . .

EXPOSE 50001

CMD npm run start
