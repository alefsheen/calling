FROM node:18.20.8

WORKDIR /app

COPY . .

RUN pwd
RUN ls -ltrha

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
