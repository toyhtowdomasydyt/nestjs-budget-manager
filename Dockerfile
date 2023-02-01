FROM node:19-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npm run build

EXPOSE $HTTP_PORT
CMD [ "npm", "run", "start:migrate:prod" ]