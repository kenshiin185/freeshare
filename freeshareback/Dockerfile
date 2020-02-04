# Check out https://hub.docker.com/_/node to select a new base image
# depuis l'image avec node 12
FROM node:12-slim

# installation de imagemagick
RUN apt-get update
RUN apt-get install imagemagick -y

# changement d'id user (node)
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app
# changement de repertoire
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

# recuperation des dependences
RUN npm install

# Bundle app source code
# changement de proprietaire du code
COPY --chown=node . .

# compilation
RUN npm run build

# creation des repertoires
RUN mkdir download
RUN mkdir vignette

# exportation des volumes
VOLUME /home/node/app/download
VOLUME /home/node/app/vignette

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "node", "." ]
