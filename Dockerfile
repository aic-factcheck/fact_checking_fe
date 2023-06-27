# ---- Base Node ----
FROM node:18 AS base
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

# ---- Dependencies ----
FROM base AS dependencies
RUN yarn install
COPY . .

# ---- Build ----
FROM dependencies AS build
RUN yarn build

# ---- Release ----
FROM nginx:1.21-alpine AS release
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]