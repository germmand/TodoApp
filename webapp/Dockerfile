FROM node:10.15.3
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8080
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
CMD []
