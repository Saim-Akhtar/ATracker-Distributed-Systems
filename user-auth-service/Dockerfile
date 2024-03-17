# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16

# Create app directory (this is the working directory for your application)
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install all node packages
RUN npm install

# If you are building for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Your app binds to port 3000 by default, expose this port
EXPOSE 3000

# Run the app
CMD [ "node", "app.js" ]
