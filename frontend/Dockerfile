FROM node:18

WORKDIR /app/frontend

COPY package.json package-lock.json /app/frontend/

RUN npm install

COPY . /app/frontend

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "HOST=0.0.0.0 npm start"]