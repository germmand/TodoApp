FROM node:10.15.3
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn install
EXPOSE 8080
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
CMD []
