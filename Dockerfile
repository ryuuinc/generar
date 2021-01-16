# release
FROM node:14.15.4-alpine
WORKDIR /generar
COPY package*.json ./
RUN npm ci --production
COPY lib ./lib
COPY configs ./configs
EXPOSE 55001
CMD ["npm", "start"]
