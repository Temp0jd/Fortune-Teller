<div align="center">

# 🔮 F-Teller

### *AI 智能命理占卜平台*

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker" alt="Docker Ready">
</p>

<p align="center">
  <b>融合古老东方命理智慧与现代 AI 技术</b>
</p>

<p align="center">
  <a href="#-功能特性">功能特性</a> •
  <a href="#-快速开始">快速开始</a> •
  <a href="#-ai-角色">AI 角色</a> •
  <a href="#-docker-部署">Docker 部署</a> •
  <a href="#-api-接口">API 接口</a> •
  <a href="#-项目结构">项目结构</a>
</p>

</div>

---

## ✨ 功能特性

### 七大占卜模块

<table>
<tr>
<td width="33%" align="center">

📅 **老黄历**
- 每日宜忌查询
- 农历信息、二十八宿
- 彭祖百忌、吉神凶煞

</td>
<td width="33%" align="center">

♈ **星座运势**
- 十二星座运势
- 日/周/月预测
- 星座配对分析

</td>
<td width="33%" align="center">

🎴 **塔罗牌**
- 经典韦特牌阵
- AI 智能解读
- 单张/三张/凯尔特十字

</td>
</tr>
<tr>
<td width="33%" align="center">

☯️ **八字算命**
- 四柱八字排盘
- 十神五行分析
- 大运流年推算

</td>
<td width="33%" align="center">

🌀 **奇门遁甲**
- 九宫格排盘
- 八门九星配置
- 时辰吉凶分析

</td>
<td width="33%" align="center">

⚡ **六爻预测**
- 周易六爻占卜
- 起卦解卦
- AI 智能断卦

</td>
</tr>
<tr>
<td width="33%" align="center">

💕 **合盘分析**
- 双人配对分析
- 八字合婚
- 星座合盘

</td>
<td width="33%" align="center">

🤖 **AI 追问模式**
- 支持连续对话
- 上下文记忆
- 最多 10 轮追问

</td>
<td width="33%" align="center">

⚙️ **多 AI 支持**
- Kimi、DeepSeek
- GLM、Anthropic
- 一键切换

</td>
</tr>
</table>

---

## 🎭 AI 角色

每个模块都有独特的 AI 角色人设，提供专业且有趣的解读体验：

| 模块 | AI 角色 | 风格特点 |
|------|---------|----------|
| **八字** | 陈叔/陈姨 | 老街坊长辈，像邻居聊天一样自然 |
| **六爻** | 老张 | 直来直去，接地气，三十年卦摊经验 |
| **合盘** | 小雨 | 闺蜜式情感咨询，温柔贴心 |
| **奇门** | 老李 | 道观长者，慢条斯理，看透世事 |
| **塔罗** | 薇薇安 | 塔罗馆老板，咖啡馆般的轻松氛围 |
| **星座** | 星语 | 朋友聊天式，分享运势建议 |
| **老黄历** | 王大爷 | 城隍庙旁卖黄历，老街坊生活智慧 |

---

## 🚀 快速开始

### 环境要求

- Node.js 20+
- npm 或 pnpm
- AI API Key (Kimi/DeepSeek/GLM/Anthropic 任一)

### 方式一：Docker 一键运行（推荐 ⭐）

无需克隆仓库，一条命令即可运行：

```bash
# 安装 Docker（如未安装）
# Ubuntu/Debian: sudo apt install docker.io
# CentOS/RHEL: sudo yum install docker

# 一键运行（替换 your_api_key 为你的 API Key）
docker run -d \
  --name fortuning-ai \
  -p 3000:3000 \
  -e AI_API_KEY=your_api_key \
  -e AI_PROVIDER=deepseek \
  --restart unless-stopped \
  Tempo1221/fortuning-ai:latest

# 访问 http://localhost:3000
```

### 方式二：本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/Temp0jd/Fortune-Teller.git
cd Fortune-Teller

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的 API Key

# 4. 启动开发服务器
npm run dev
```

访问 http://localhost:3000

---

## 🐳 Docker 部署

### 一键部署（最简单）

```bash
docker run -d \
  --name fortuning-ai \
  -p 3000:3000 \
  -e AI_API_KEY=your_api_key \
  -e AI_PROVIDER=deepseek \
  -e AI_BASE_URL=https://api.deepseek.com \
  --restart unless-stopped \
  Tempo1221/fortuning-ai:latest
```

### Docker Compose

```bash
# 1. 克隆仓库
git clone https://github.com/Temp0jd/Fortune-Teller.git
cd Fortune-Teller

# 2. 配置环境
cp .env.example .env
# 编辑 .env 填入 API 密钥

# 3. 启动
docker-compose up -d

# 4. 查看日志
docker-compose logs -f
```

### 常用命令

```bash
# 查看状态
docker ps

# 查看日志
docker logs -f fortuning-ai

# 停止服务
docker stop fortuning-ai

# 重启服务
docker restart fortuning-ai

# 更新到最新版本
docker pull Tempo1221/fortuning-ai:latest
docker stop fortuning-ai && docker rm fortuning-ai
docker run -d ... # 使用上面的完整命令重新运行
```

详细 Docker 文档请参阅 [DOCKER.md](./DOCKER.md)

---

## ⚙️ 环境变量

### 必需配置

| 变量 | 说明 | 示例 |
|------|------|------|
| `AI_PROVIDER` | AI 提供商 | `deepseek`, `kimi`, `glm` |
| `AI_API_KEY` | API 密钥 | `sk-...` |

### 提供商配置

**DeepSeek（推荐，性价比高）**
```env
AI_PROVIDER=deepseek
AI_API_KEY=sk-your_key
AI_BASE_URL=https://api.deepseek.com
```

**Kimi**
```env
AI_PROVIDER=kimi
ANTHROPIC_AUTH_TOKEN=your_key
ANTHROPIC_BASE_URL=https://api.kimi.com/coding/
```

**GLM**
```env
AI_PROVIDER=glm
GLM_API_KEY=your_key
GLM_BASE_URL=https://open.bigmodel.cn/api/paas/v4
```

### 功能开关

```env
ENABLE_HOROSCOPE=true    # 星座
ENABLE_TAROT=true        # 塔罗
ENABLE_BAZI=true         # 八字
ENABLE_QIMEN=true        # 奇门
ENABLE_LIUYAO=true       # 六爻
ENABLE_SYNASTRY=true     # 合盘
ENABLE_HUANGLI=true      # 老黄历
```

---

## 📁 项目结构

```
Fortune-Teller/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (features)/               # 功能模块
│   │   ├── 📁 bazi/                 # 八字算命
│   │   ├── 📁 huangli/              # 老黄历
│   │   ├── 📁 horoscope/            # 星座运势
│   │   ├── 📁 tarot/                # 塔罗牌
│   │   ├── 📁 qimen/                # 奇门遁甲
│   │   ├── 📁 liuyao/               # 六爻预测
│   │   └── 📁 synastry/             # 合盘分析
│   ├── 📁 api/                      # API 路由
│   │   ├── 📁 bazi/                 # 八字 API
│   │   ├── 📁 huangli/              # 老黄历 API
│   │   └── ...                      # 其他 API
│   ├── 📄 layout.tsx                # 根布局
│   └── 📄 page.tsx                  # 首页
│
├── 📁 components/                   # React 组件
│   ├── 📁 features/                 # 功能组件
│   │   ├── 📁 bazi/                 # 八字相关组件
│   │   ├── 📁 liuyao/               # 六爻相关组件
│   │   └── ...
│   └── 📁 ui/                       # UI 组件
│
├── 📁 lib/                          # 工具库
│   ├── 📁 ai/                       # AI 提供商封装
│   │   ├── 📄 factory.ts            # AI 工厂
│   │   ├── 📄 hooks.ts              # AI Hooks
│   │   └── 📁 providers/            # 各 AI 提供商
│   ├── 📁 calculations/             # 命理计算逻辑
│   │   ├── 📄 bazi.ts               # 八字计算
│   │   ├── 📄 liuyao.ts             # 六爻计算
│   │   └── ...
│   ├── 📁 prompts/                  # AI 提示词
│   │   ├── 📄 bazi.ts
│   │   └── ...
│   └── 📁 conversation/             # 对话管理
│
├── 📁 public/                       # 静态资源
│   └── 📁 tarot-cards/              # 塔罗牌图片
│
├── 📁 scripts/                      # 脚本工具
│   ├── 📄 docker-publish.sh         # Docker 发布脚本
│   └── 📄 setup-docker-hub.sh       # Docker Hub 设置
│
├── 📄 .env.example                  # 环境变量示例
├── 📄 .dockerignore                 # Docker 忽略文件
├── 📄 docker-compose.yml            # Docker Compose 配置
├── 📄 Dockerfile                    # Docker 构建文件
├── 📄 DOCKER.md                     # Docker 详细文档
└── 📄 README.md                     # 本文件
```

---

## 🔌 API 接口

所有 API 端点都支持 AI 解读和纯计算两种模式。

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/bazi` | POST | 八字计算与解读 |
| `/api/huangli` | POST | 老黄历查询 |
| `/api/horoscope` | POST | 星座运势 |
| `/api/tarot` | POST | 塔罗解读 |
| `/api/qimen` | POST | 奇门排盘 |
| `/api/liuyao` | POST | 六爻起卦 |
| `/api/synastry` | POST | 合盘分析 |
| `/api/health` | GET | 健康检查 |

### 请求示例

**八字排盘（无 AI）**
```bash
curl -X POST http://localhost:3000/api/bazi \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-01-01T12:00:00.000Z",
    "gender": "male"
  }'
```

**八字 AI 解读**
```bash
curl -X POST http://localhost:3000/api/bazi \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "分析这个八字的财运和事业",
    "isFollowUp": false
  }'
```

**追问模式**
```bash
curl -X POST http://localhost:3000/api/bazi \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "刚才说的财运，能详细说说吗",
    "isFollowUp": true,
    "conversationId": "conv_xxx"
  }'
```

---

## 🛡️ 限流保护

内置多层限流保护，防止滥用：

| 限制类型 | 默认值 | 说明 |
|----------|--------|------|
| 请求频率 | 20/分钟 | 每 IP 每分钟最多请求 |
| 并发请求 | 2 | 同时处理的最大请求数 |
| 请求间隔 | 5 秒 | 两次请求最小间隔 |
| 追问次数 | 10/天 | 每会话每天最多追问 |

---

## 🛠️ 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) + [React 19](https://react.dev/)
- **语言**: [TypeScript 5](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **农历计算**: [lunar-typescript](https://github.com/6tail/lunar-typescript)
- **容器化**: [Docker](https://www.docker.com/)

---

## ❓ 常见问题

### Q: Docker 运行后无法访问？

检查端口是否被占用：
```bash
# 更换端口运行
docker run -p 8080:3000 ...
# 然后访问 http://localhost:8080
```

### Q: 如何更换 AI 提供商？

修改环境变量后重启容器：
```bash
docker stop fortuning-ai
docker rm fortuning-ai
docker run -e AI_PROVIDER=kimi -e AI_API_KEY=xxx ...
```

### Q: 如何更新到最新版本？
```bash
docker pull Tempo1221/fortuning-ai:latest
docker stop fortuning-ai
docker rm fortuning-ai
docker run ... # 使用之前的命令重新运行
```

### Q: 日志在哪里查看？
```bash
docker logs -f fortuning-ai
```

---

## 🤝 贡献指南

欢迎提交 Issue 和 PR！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

---

## 📄 许可证

[MIT License](./LICENSE) © 2024 F-Teller

---

<div align="center">

**Built with ancient wisdom and modern technology** 🔮

如果这个项目对你有帮助，请给个 ⭐ Star！

</div>
