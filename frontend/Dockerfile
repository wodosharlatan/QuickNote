# Base image
FROM node:18

RUN npm install -g http-server

WORKDIR /usr/src/app/build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

WORKDIR /usr/src/app/

RUN mv build/dist dist

RUN rm -r build

EXPOSE 8080

CMD [ "http-server","-P http://localhost:8080?", "dist" ]
