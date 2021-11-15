FROM node:16.13.0-alpine as build

WORKDIR /app

COPY pictephone/package.json /app/
RUN npm install
COPY pictephone /app
RUN npm run build 

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]