# builder
FROM alpine:latest AS builder
WORKDIR /app
RUN apk add --no-cache nodejs npm
COPY package*.json ./
RUN npm ci --production

# generar
FROM alpine:latest
WORKDIR /generar
RUN apk add --no-cache nodejs npm
COPY --from=builder /app ./
COPY lib ./lib
COPY configs ./configs
EXPOSE 3000
CMD ["npm", "start"]
