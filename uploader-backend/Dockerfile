FROM node:16-alpine as backdev
ENV NODE_ENV=development
WORKDIR /api/
COPY . .
RUN yarn
CMD [ "yarn", "dev" ]


# docker build -t uploader-api:backdev .
# docker run -it -p 3001:3001 --name uploader-api-container uploader-api:backdev
FROM node:16-alpine as backprod
ENV NODE_ENV=production
WORKDIR /api/
COPY . .
RUN yarn
RUN yarn build
RUN mkdir -p ./build/tmp
RUN mkdir -p ./build/tmp/uploads
CMD [ "yarn", "start" ]