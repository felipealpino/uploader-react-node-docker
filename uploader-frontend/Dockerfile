# https://shahmirprogrammer.medium.com/docker-with-react-changes-reflect-real-time-inside-a-container-f83acf208f8a

FROM node:16-alpine

WORKDIR /usr/src/app/uploader-frontend/

COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]