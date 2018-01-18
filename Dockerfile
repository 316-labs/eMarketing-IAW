FROM node

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

RUN mkdir -p /frontend_app
WORKDIR /frontend_app
COPY . /frontend_app

RUN npm install

CMD npm run start

EXPOSE 3001
