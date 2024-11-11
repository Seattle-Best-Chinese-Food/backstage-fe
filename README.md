# Dockerized React App

- build: `docker build -t sbcf-fe .`
- network: `docker network create fe-network`
- run: `docker run --network fe-network -p 8080:5173 sbcf-fe`
