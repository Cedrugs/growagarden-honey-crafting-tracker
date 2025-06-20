FROM node:24-alpine AS builder

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install --verbose
RUN npm run build

FROM nginx:stable-alpine AS production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
