FROM docker.io/node:18-buster

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Update permsissions of app source files
RUN chown -R node /usr/src/app

ENV PORT=8888
EXPOSE 8888

USER node

CMD [ "npm", "start" ]
