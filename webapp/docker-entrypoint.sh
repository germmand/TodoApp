#!/bin/bash

# ---
# This is unnecesary but you know, just to make sure. :)
# ---
cd /usr/src/app

# Start webpack development server. Yey! :D
exec yarn start -- --host 0.0.0.0 --port 8080
