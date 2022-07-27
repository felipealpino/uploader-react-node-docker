# https://shahmirprogrammer.medium.com/docker-with-react-changes-reflect-real-time-inside-a-container-f83acf208f8a
# docker run -d -p 3000:3000 -v /uploader-frontend -v "$(pwd):/uploader" --name uploader-frontend-container uploader-frontend:frontdev

FROM node:16-alpine as frontdev
ENV NODE_ENV=development
WORKDIR /uploader/
COPY . .
RUN yarn
CMD [ "yarn", "start" ]