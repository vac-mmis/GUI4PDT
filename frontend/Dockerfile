# build stage
FROM node:lts-alpine AS build-stage

WORKDIR /frontend

ENV VITE_API_BASE_URL=http://localhost:3000/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx AS production-stage

COPY --from=build-stage /frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
