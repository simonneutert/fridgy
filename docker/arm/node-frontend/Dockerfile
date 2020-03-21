FROM arm32v7/node:11.11-stretch

EXPOSE 8080

ENV APP_HOME /fridgy-frontend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN apt-get update && apt-get -y install sqlite3
RUN npm install -g http-server node-pre-gyp node-gyp

COPY package.json ./
COPY package-lock.json ./
# Make sure NODE_ENV is NOT set to production
# this will brake npm install and building vue
RUN npm install 

COPY . $APP_HOME

ARG vue_app_backend_api_url
ENV VUE_APP_BACKEND_API_URL=$vue_app_backend_api_url

# enable RFID Reader by commenting this out
# check settings in the used docker-compose.*.yml, too!
# ENV VUE_APP_RFID=true

RUN echo "VUE_APP_BACKEND_API_URL=$VUE_APP_BACKEND_API_URL" > .env

RUN npm run build

CMD ["http-server", "./dist"]