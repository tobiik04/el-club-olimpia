FROM node:18-alpine

WORKDIR /app

copy . ./app
COPY package.json yarn.lock ./
RUN yarn install --prod
RUN yarn build

RUN adduser --disabled-password olimpiauser
RUN chown -R olimpiauser:olimpiauser /app
USER olimpiauser

# Limpiar el caché
RUN yarn cache clean --force

EXPOSE 3000

CMD [ "yarn","start" ]