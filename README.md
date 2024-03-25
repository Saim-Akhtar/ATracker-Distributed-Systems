## Setup

Install Docker by following this link basd on your OS: https://docs.docker.com/engine/install/

## Run on Docker

### Consumer Backend
Make sure your docker is running. Run the following command on terminal to start the app
```
cd admin-app
docker stack deploy -c docker-compose.yaml admin
```

### Admin App
```
cd consumer-backend
docker stack deploy -c docker-compose.yml consumer
```
