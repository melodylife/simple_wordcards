FROM node:latest

RUN mkdir -p /home/project
WORKDIR /home/project

RUN chmod -R 777 /home/project
COPY . /home/project

RUN npm install
RUN npm install -g forever

EXPOSE 3000

CMD ["forever","app.js"]

