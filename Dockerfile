ARG NODE_VERSION
ARG ALPINE_VERSION

FROM node:$NODE_VERSION-alpine$ALPINE_VERSION as build

WORKDIR /app
COPY . /app

RUN npm ci
RUN npm run \
      build-production

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

