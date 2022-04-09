#!/bin/bash -xe

docker run -p 6379:6379 --name redis -d redis
docker run -p 5432:5432 --name postgres --env POSTGRES_PASSWORD=postgres -d postgres
sleep 5
docker exec -it postgres su - postgres -c "psql -c 'create database mathy;'"
cp example.env .env
pnpm i
./ex migrate

