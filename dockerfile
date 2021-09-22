FROM node:14-alpine AS base
WORKDIR /usr/app
COPY package*.json .

FROM base AS debug
RUN npm install
COPY . .
RUN npm run build

FROM base AS prod
RUN npm install --production
COPY --from=debug /usr/app/dist .
ENTRYPOINT [ "node", "src/index.js" ]
