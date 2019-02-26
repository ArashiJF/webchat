FROM node:10.15

#its listening on the port:
EXPOSE 4000

#update caches
RUN apt update

#set the workdir
WORKDIR /server

#copy the code inside the workdirectory
COPY . .

#install the dependencies
RUN npm install 

#Start the server
CMD ["node","index.js"]