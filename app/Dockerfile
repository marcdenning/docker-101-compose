FROM alpine:3.5

# Install system dependencies
ENV NODE_VERSION 6.9.2-r1
ENV NGINX_VERSION 1.10.3-r0
ENV BASH_VERSION 4.3.46-r5

RUN apk add --no-cache \
  nodejs=${NODE_VERSION} \
  nginx=${NGINX_VERSION} \
  bash=${BASH_VERSION}

# Pipe nginx access and error logs to stdout and stderr for logging by Docker
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package.json
RUN npm install

# Bundle app source
COPY src src/
COPY public public/

RUN npm run build \
  && cp -R build/. /var/www/html

# Add nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
COPY run.sh run.sh

EXPOSE 80

CMD [ "/bin/sh", "/usr/src/app/run.sh" ]
