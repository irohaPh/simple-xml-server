FROM alpine:latest
ARG PORT=3000

WORKDIR /tmp

RUN apk update && apk add --no-cache nodejs nodejs-current-npm

ENV NODE_HOST 0.0.0.0
ENV NODE_PORT $PORT

COPY [ "./src", "./package.json", "./package-lock.json", "./" ]
RUN npm install --no-optional --no-shrinkwrap --no-package-lock

VOLUME /tmp

EXPOSE $PORT
CMD npm start