FROM node:20.9.0-alpine AS in-front

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

# Copying source files
COPY . .
RUN ls -ltrha
RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

# Running the app
CMD ["npm", "run" , "preview"]

#ENTRYPOINT ["npm", "start"]
