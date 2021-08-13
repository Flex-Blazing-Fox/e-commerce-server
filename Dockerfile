FROM node:14

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

# Set a working directory
COPY ./package.json .
COPY ./package-lock.json .

# Install Node.js dependencies
RUN npm install --only=prod
RUN npm install -g sequelize-cli

# Copy application files
COPY .sequelizerc .
COPY config ./config
COPY controllers ./controllers
COPY database ./database
COPY helpers ./helpers
COPY middlewares ./middlewares
COPY migrations ./migrations
COPY models ./models
COPY routers ./routers
COPY seeders ./seeders
COPY .env ./.env
COPY index.js ./index.js


USER node
CMD [ "node", "index.js" ]