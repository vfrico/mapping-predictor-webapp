# Web Application for mapping predictor

*This project is part of my work done during my Google 
Summer of Code 2018 in collaboration with DBpedia*

This web application is built using React.js as visual framework. All the previous scaffolding has been done using [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate). 

The only dependency added to this project is [material-ui](https://material-ui.com/), to fastly create a modern web application using react prebuilt components.

## Develop environment
All the development has been done on Visual Studio Code editor, which is an open source editor based on electron.

## Running the web app
As a Node.js application, `npm` is needed. After installing the last version of `node` and `npm`, follow those steps:

* Download this repository
* cd to the local folder
* Run `npm install`
* Run `npm run start` to start the development server.

Alternatively, a docker image is available. It can be built with:

```
$ docker build -t vfrico/dbpedia-mappings-webapp:latest .
```

Or download the container from the docker hub: [vfrico/dbpedia-mappings-webapp](https://hub.docker.com/r/vfrico/dbpedia-mappings-webapp/)

It is recommended to run with `docker-compose` alongside with the backend container. Please, see [vfrico/mapping-predictor-backend](https://github.com/vfrico/mapping-predictor-backend) to learn how to deploy all the stack.