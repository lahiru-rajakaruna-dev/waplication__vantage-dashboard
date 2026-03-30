FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm i -g pnpm@latest
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY package.json tsconfig* ./
RUN npm i -g pnpm@latest
RUN pnpm install

CMD pnpm run serve --port $PORT