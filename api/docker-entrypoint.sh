#!/bin/bash

# ---
# This is unnecesary but you know, just to make sure. :)
# ---
cd /usr/src/app

# Run migrations
python manage.py migrate

# Start server. Wojoo! :)
exec python manage.py runserver 0.0.0.0:8000
