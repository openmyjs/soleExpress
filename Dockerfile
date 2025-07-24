# 使用官方 Node.js 镜像作为基础

 # 轻量级 Alpine 版本，减少镜像体积
FROM node:20.19.4
#FROM node:18-alpine

# 在容器中创建一个目录
RUN mkdir -p /usr/src/app

# 设置工作目录
WORKDIR /usr/src/app

# 复制依赖文件并安装依赖（分层缓存优化）
COPY package*.json ./
# 生产环境仅安装依赖，若需开发依赖可移除 --production
RUN npm install --production

# 复制应用代码
COPY . .

# 暴露端口（与 app.js 中配置一致）
EXPOSE 3000

# 定义容器启动命令
CMD npm start