FROM node:18

WORKDIR /app/frontend

COPY . /app/frontend

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "HOST=0.0.0.0 npm start"]