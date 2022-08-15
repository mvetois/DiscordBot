FROM node:latest

WORKDIR /app

COPY . .

RUN npm install
RUN npm run load

CMD ["npm", "start"]