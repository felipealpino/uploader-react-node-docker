FROM node:16-alpine as api
WORKDIR /api/
COPY . .
RUN yarn
CMD [ "yarn", "dev" ]
EXPOSE 3001

# docker build -t uploader-api:api .
# docker run -it -p 3001:3001 --name uploader-api-container uploader-api:api