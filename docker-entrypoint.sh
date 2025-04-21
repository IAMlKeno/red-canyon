#!/bin/bash

install_redis() {
  # Check if username and password are provided
  # if [ -z "$1" ] || [ -z "$2" ]; then
  #  echo "Usage: install_redis <username> <password>"
  #  return 1
  # fi

  username=${NODE_REDIS_USER}
  password=${NODE_REDIS_PASSWORD}

  # Update package lists
  apt update

  # Install redis-server
  apt install -y redis-server

  # Configure redis to require a password
  sed -i "s/# requirepass foobared/requirepass $password/g" /etc/redis/redis.conf

  # Restart redis service
  echo "Redis: attempting to start the service..."
  service redis-server restart

  echo "Adding user: ${NODE_REDIS_USER}"
  # Add user to redis group (optional, for managing redis without sudo)
  useradd "$username" -g redis
  #usermod -aG redis "$username"

  echo "Redis: installed and configured with password.  User '$username' added to redis group."
}

setup_frontend() {
  # Frontend setup...
  echo "SETTING UP THE FRONTEND..."
  cd /project/app
  # npm install && npm run build && npm run dev
  npm install && npm run build
}

setup_server() {
  echo "Building and starting the server..."
  # Server setup...
  cd /project/server

  # npm install && npm run build && npm run start -- --host=0.0.0.0
  npm install && npm run build
}

start_supervisor() {
  echo "SETTING UP SUPERVISOR"
  supervisord -c /etc/supervisor/supervisord.conf
}

install_redis
setup_frontend
setup_server
#start_supervisor

/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
