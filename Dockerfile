# 実行前準備用
FROM alpine:latest as prepare

WORKDIR /tmp

RUN apk update && apk add --no-cache nodejs nodejs-current-npm

COPY [ "./src", "./package.json", "./package-lock.json", "./" ]
RUN npm install

# 実行用
FROM alpine:latest as runner
ARG PORT=3000

WORKDIR /tmp

RUN apk update && apk add --no-cache nodejs

ENV NODE_HOST 0.0.0.0
ENV NODE_PORT $PORT

COPY --from=prepare /tmp .

VOLUME /tmp

EXPOSE $PORT
CMD node ./node_modules/.bin/nodemon -e js,json src/index.js