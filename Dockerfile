FROM node:22
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npx tsc
EXPOSE 3000
CMD ["npm", "start"]
