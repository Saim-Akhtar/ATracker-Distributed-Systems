# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16

# Create app directory (this is the working directory for your application)
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you have native dependencies, you'll need extra tools
# RUN apk --no-cache add --virtual builds-deps build-base python3

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8083

# Define the Docker image's behavior at runtime
CMD [ "node", "app.js" ]
