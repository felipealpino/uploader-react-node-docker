FROM node:16-alpine as backdev
ENV NODE_ENV=development
WORKDIR /api/
COPY . .
RUN yarn
CMD [ "yarn", "dev" ]