FROM node:14

# Install vim for easier viewing files inside a container
RUN apt-get update && apt-get install -y vim

RUN mkdir -p /code/draftivist_ui
WORKDIR /code/draftivist_ui

COPY package.json /code/draftivist_ui/

RUN  yarn install
