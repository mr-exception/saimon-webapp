FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn run build

RUN yarn global add serve

CMD ["serve", "-s", "build"]