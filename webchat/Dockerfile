From node:10.15

#exposing the port where webchat runs
EXPOSE 4200

#update apt cache
RUN apt update

#install nginx
RUN apt-get install -y --no-install-recommends nginx

#install angular cli
RUN npm install -g @angular/cli

#configuring nginx
RUN rm /etc/nginx/sites-enabled/default
COPY ./config/webchat.config /etc/nginx/sites-enabled/webchat


#set the workdir
WORKDIR /webchat

#copy the front end code into said workdir
COPY . .

#Install all dependencies
RUN npm install

#compile
RUN ng build --prod --aot --build-optimizer

#Start serving
CMD nginx -g 'daemon off;'





