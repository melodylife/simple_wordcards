FROM node:latest

RUN mkdir -p /home/project
WORKDIR /home/project

RUN chmod -R 777 /home/project
COPY . /home/project

RUN npm install

EXPOSE 3000

CMD ["forever","app.js"]

