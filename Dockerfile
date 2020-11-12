# release
FROM node:12.19.0-alpine
WORKDIR /generar
COPY package*.json ./
RUN npm ci --production
COPY lib ./lib
COPY configs ./configs
EXPOSE 55001
CMD ["npm", "start"]
