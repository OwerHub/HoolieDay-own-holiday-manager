FROM node:14-alpine
WORKDIR /backend
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8000
CMD [ "node", "start.js" ]