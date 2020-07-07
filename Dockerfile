# build
FROM node:12.18.2-alpine
WORKDIR /generar
COPY package*.json ./
RUN npm ci --production
COPY lib ./lib
COPY files ./files
COPY configs ./configs
EXPOSE 55001
CMD ["npm", "start"]
