FROM node:11.11-stretch

EXPOSE 8081

ENV APP_HOME /fridgy-backend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN apt-get update && apt-get -y install sqlite3
RUN npm install -g node-pre-gyp node-gyp

COPY package.json ./
COPY package-lock.json ./
# Make sure NODE_ENV is NOT set to production
# this will brake npm install and building vue
RUN npm install

COPY ./src/server.js ./

CMD ["node", "server.js"]
