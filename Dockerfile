# Giai đoạn 1: Build ứng dụng
FROM node:22-slim AS builder

WORKDIR /app

# Copy file cấu hình để cài đặt dependency trước (tận dụng Docker cache)
COPY package*.json ./
RUN npm install

# Copy toàn bộ code và build
COPY . .
RUN npm run build

# Giai đoạn 2: Chạy ứng dụng (Stage gọn nhẹ hơn)
FROM node:22-slim

WORKDIR /app

# Chỉ copy những file đã build từ giai đoạn 1
COPY --from=builder /app/.output ./.output

# Nuxt mặc định chạy trên cổng 3000
EXPOSE 3000

# Thiết lập biến môi trường để lắng nghe trên mọi IP (cần thiết cho Docker)
ENV HOST=0.0.0.0
ENV PORT=3000

# Chạy Nuxt bằng node
CMD ["node", ".output/server/index.mjs"]