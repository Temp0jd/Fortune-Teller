# Fortunetell AI - 部署指南

## 系统要求

- Node.js 18+ (本地开发)
- Docker & Docker Compose (推荐部署方式)
- Nginx (反向代理)
- 2GB+ RAM
- 10GB+ 磁盘空间

## 快速部署

### 1. 使用 Docker Compose（推荐）

```bash
# 1. 克隆项目并进入目录
cd fortunetell-ai

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，设置 AI_API_KEY 和其他配置

# 3. 构建并启动
docker-compose up -d

# 4. 检查状态
docker-compose ps
docker-compose logs -f app
```

### 2. 手动部署

```bash
# 1. 安装依赖
npm ci

# 2. 构建
npm run build

# 3. 启动
NODE_ENV=production npm start
```

## 配置 Nginx

### 安装 Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx

# 启动 Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 基础配置（HTTP）

```bash
# 复制配置文件
sudo cp nginx.conf /etc/nginx/sites-available/fortunetell-ai

# 创建符号链接
sudo ln -s /etc/nginx/sites-available/fortunetell-ai /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载配置
sudo systemctl reload nginx
```

## 配置 HTTPS (SSL/TLS)

### 方式 1: Let's Encrypt（推荐）

```bash
# 1. 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 2. 获取证书（自动配置 Nginx）
sudo certbot --nginx -d your-domain.com

# 3. 自动续期测试
sudo certbot renew --dry-run
```

### 方式 2: 手动配置

```bash
# 1. 创建 SSL 目录
sudo mkdir -p /etc/nginx/ssl

# 2. 复制证书文件
sudo cp your-domain.crt /etc/nginx/ssl/fullchain.pem
sudo cp your-domain.key /etc/nginx/ssl/privkey.pem
sudo cp ca-bundle.crt /etc/nginx/ssl/chain.pem

# 3. 修改 Nginx 配置
# 编辑 /etc/nginx/sites-available/fortunetell-ai
# 将 server_name localhost 改为 server_name your-domain.com
# 取消 HTTPS server 块的注释

# 4. 重启 Nginx
sudo systemctl restart nginx
```

## 防火墙配置

```bash
# Ubuntu/Debian (UFW)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## 健康检查

```bash
# 检查应用健康
curl http://localhost:3000/api/health

# 检查 Nginx
curl http://localhost/api/health

# 查看日志
docker-compose logs -f app
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 更新部署

```bash
# 1. 拉取最新代码
git pull origin main

# 2. 重建镜像
docker-compose down
docker-compose build --no-cache

# 3. 重启服务
docker-compose up -d

# 4. 清理旧镜像
docker image prune -f
```

## 故障排除

### 应用无法启动

```bash
# 检查日志
docker-compose logs app

# 检查环境变量
cat .env

# 检查端口占用
sudo lsof -i :3000
```

### Nginx 502 错误

```bash
# 检查应用是否运行
curl http://localhost:3000/api/health

# 检查 Nginx 配置
sudo nginx -t

# 检查 SELinux（如果启用）
sudo setsebool -P httpd_can_network_connect 1
```

### SSL 证书问题

```bash
# 检查证书有效期
openssl x509 -in /etc/nginx/ssl/fullchain.pem -noout -dates

# 检查证书链完整性
openssl verify -CAfile /etc/nginx/ssl/chain.pem /etc/nginx/ssl/fullchain.pem
```

## 性能优化

### 启用 Gzip

已在 nginx.conf 中配置：
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### 静态资源缓存

已在 nginx.conf 中配置：
```nginx
location /_next/static {
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, immutable";
}
```

### Docker 资源限制

编辑 `docker-compose.yml`:
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 512M
```

## 监控建议

1. **日志收集**: 使用 ELK 或 Loki 收集日志
2. **性能监控**: 使用 Prometheus + Grafana
3. **错误追踪**: 集成 Sentry 等错误追踪服务
4. **Uptime 监控**: 使用 UptimeRobot 或 Pingdom

## 安全建议

1. 定期更新系统和依赖
2. 使用强密码和密钥管理
3. 启用自动安全更新
4. 配置 fail2ban 防止暴力破解
5. 定期备份数据

```bash
# 安装 fail2ban
sudo apt install fail2ban

# 配置 fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```
