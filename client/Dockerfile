FROM node:18
WORKDIR /app
COPY . .
EXPOSE 3000

# 这里自动找文件，不管是 index.js 还是 app.js 都能跑！
CMD ["sh", "-c", "node index.js 2>/dev/null || node app.js 2>/dev/null || node main.js"]