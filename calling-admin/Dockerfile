FROM node:20.9.0-alpine AS in-front

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Copying source files
COPY . .
RUN ls -ltrha
RUN npm ci --legacy-peer-deps --no-audit --no-fund
RUN npm run build

EXPOSE 3000

# Running the app
CMD ["npm", "run" , "start"]

#ENTRYPOINT ["npm", "start"]
