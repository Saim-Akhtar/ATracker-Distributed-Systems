## Setup
This is a django application. To start the web application:
```
cd admin-app
```

## Run on Docker
Make sure your docker is running. Run the following command on terminal to start the app
```
docker-compose up -d
```

## Run on Local Server

Run the following commands on terminal in order:
```
# Make sure Python version is 3.10
pip3 install -r requirements.txt
python3 manage.py runserver
```