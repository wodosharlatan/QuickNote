# Base image
FROM node:18

RUN npm install -g http-server

WORKDIR /usr/src/app/build

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_BACKEND_SERVER

RUN npm run build

WORKDIR /usr/src/app/

RUN mv build/dist dist

RUN rm -r build

EXPOSE 4000

CMD http-server -a ${FRONTEND_HOST} -p ${FRONTEND_PORT} -P http://${FRONTEND_HOST}:${FRONTEND_PORT}? dist
