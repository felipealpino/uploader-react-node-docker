
# https://shahmirprogrammer.medium.com/docker-with-react-changes-reflect-real-time-inside-a-container-f83acf208f8a
# docker run -d -p 3000:3000 -v /uploader/node_modules -v "$(pwd):/uploader" --name uploader-frontend-container uploader-frontend:ui

FROM node:16-alpine as ui
WORKDIR /uploader/
COPY . .
RUN yarn
CMD [ "yarn", "start" ]
EXPOSE 3000


# docker build -t uploader-frontend:ui .
# docker run -it -p 3000:3000 --name uploader-frontend-container uploader-frontend:ui