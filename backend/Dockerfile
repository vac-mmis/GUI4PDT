FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependancies
COPY package*.json ./
RUN npm install
COPY . .

# Build app
ENV NODE_PATH=./dist
RUN npm run build

# Export port and run application
EXPOSE 3000
CMD  ["npm" ,"start"]
