FROM node:14.17.1 as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build

FROM nginx:1.21.0
COPY --from=build /usr/local/app/dist/feature-toggle-app /usr/share/nginx/html
EXPOSE 80