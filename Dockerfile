# https://malcoded.com/posts/angular-docker

## Stage I - image1

# base Image
# name this image o/p as node to ref later
FROM node:8.11.2-alpine as node 

# image workdir
WORKDIR /usr/src/app

# libs defined to be installed into image dir
COPY package*.json ./
RUN npm install npm@latest

# copy project code into image
COPY . .

# using run becauses it can print out of script: refer package.json > script > build
RUN npm run build


## Stage II -image2

FROM nginx:1.13.12-alpine

# copy node(s1 img o/p) into nginx home dir
COPY --from=node /usr/src/app/dist /usr/share/nginx/html

# copy nginx conf into image
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ng serve --host --host 0.0.0.0