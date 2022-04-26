FROM node:14

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package.json package*.json ./
RUN npm install --only=production

COPY dist server.js ./
COPY --from=us-docker.pkg.dev/berglas/berglas/berglas:latest /bin/berglas /bin/berglas

ENTRYPOINT exec /bin/berglas exec -- npm start