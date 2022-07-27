FROM node:16-alpine

WORKDIR /usr/src/app/uploader-backend/

COPY . .

RUN yarn

EXPOSE 3001

CMD ["yarn", "dev"]