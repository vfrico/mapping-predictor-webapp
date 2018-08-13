FROM node:carbon

LABEL maintainer="Víctor Fernández <vfrico@gmail.com>"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y curl software-properties-common pngquant libpng-dev build-essential nasm && \
    apt-get clean

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install 
#RUN npm run build:dll

# Bundle app source
COPY . /usr/src/app

ENV REACT_APP_API_URL=http://localhost:8080/predictor/webapi

EXPOSE 3000

CMD [ "npm", "start" ]