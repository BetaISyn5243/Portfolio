FROM node:alpine
WORKDIR /
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn install
CMD ["serve", "-s", "build"]