FROM alpine:latest

WORKDIR .

RUN apk update && apk add nodejs npm

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]