FROM python:3.9-buster
ENV PYTHONUNBUFFERED 1
RUN apt-get update && apt-get install -y vim
RUN mkdir /code
RUN mkdir /code/draftivist_api
RUN mkdir /code/draftivist_api/media
RUN mkdir /code/draftivist_api/media/images
WORKDIR /code/draftivist_api
COPY requirements.txt /code/draftivist_api/
RUN pip install -r requirements.txt