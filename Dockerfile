FROM node:12.18.0-alpine
WORKDIR /generar
COPY package*.json ./
RUN npm ci --production
COPY lib ./lib
COPY files ./files
COPY configs ./configs
EXPOSE 50001
CMD ["npm", "start"]
