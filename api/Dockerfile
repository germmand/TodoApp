FROM python:3.6.8
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN apt-get update && \
    apt-get install -y python-psycopg2 libpq-dev && \
    pip install -r requirements.txt
EXPOSE 8000
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
CMD []
