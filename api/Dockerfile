FROM python:3.6.8
COPY . /app/api
WORKDIR /app/api
RUN pip install -r requirements.txt
ENV APP_PORT 8000
EXPOSE $APP_PORT
CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:$APP_PORT"]
