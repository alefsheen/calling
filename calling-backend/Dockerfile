FROM node:18.20.8

WORKDIR /app

COPY . .

RUN pwd
RUN ls -ltrha

RUN npm ci --no-audit --no-fund

EXPOSE 3000

CMD ["npm", "start"]
