<div align="center">

# F-Teller

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS 4">
</p>

<p align="center">
  <b>融合古老东方命理智慧与现代 AI 技术</b>
</p>

<p align="center">
  提供八字、六爻、合婚、奇门遁甲、塔罗、星座等全方位预测解读服务
</p>

[快速开始](#快速开始) • [功能特性](#功能特性) • [技术架构](#技术架构) • [部署指南](#部署指南)

</div>

---

## 功能特性

<table>
<tr>
<td width="50%">

### 八字 (Bazi)
四柱八字排盘与命理分析
- 纳音五行计算
- 神煞分析（天乙贵人、文昌、桃花等）
- 格局判断（身旺、身弱、中和）
- 大运流年预测

</td>
<td width="50%">

### 六爻 (Liuyao)
周易六爻占卜系统
- 纳甲地支计算
- 六亲配置分析
- 六神（青龙、朱雀、玄武等）
- 伏神/飞神解析

</td>
</tr>
<tr>
<td width="50%">

### 合婚 (Synastry)
八字合婚配对分析
- 多维度评分系统
- 性格匹配度分析
- 婚姻宫解析
- 桃花运势对比

</td>
<td width="50%">

### 奇门遁甲 (Qimen)
奇门遁甲排盘
- 时家奇门排盘
- 九宫格分析
- 八门九星配置
- 吉凶方位判断

</td>
</tr>
<tr>
<td width="50%">

### 塔罗 (Tarot)
AI 驱动塔罗解读
- 经典韦特塔罗牌阵
- 智能牌意解读
- 多维度问题分析

</td>
<td width="50%">

### 星座 (Horoscope)
西方星座运势
- 十二星座运势
- 每日/每周/每月预测
- 星座配对分析

</td>
</tr>
</table>

### 智能对话
支持基于历史对话的连续追问功能，AI 会记住上下文提供更连贯的解读体验。

---

## 技术架构

### Tech Stack

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 16 + React 19 |
| **语言** | TypeScript 5 |
| **样式** | Tailwind CSS 4 + shadcn/ui |
| **状态管理** | Zustand |
| **动画** | Framer Motion |
| **AI 集成** | Vercel AI SDK |
| **农历计算** | lunar-typescript |
| **部署** | Docker + Docker Compose |

### 系统架构

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Client  │────▶│  Next.js API    │────▶│  AI Providers   │
│                 │     │                 │     │                 │
│ • Feature Pages │     │ • Calculation   │     │ • Kimi          │
│ • Components    │     │ • Rate Limit    │     │ • GLM           │
│ • Zustand Store │     │ • Streaming     │     │ • DeepSeek      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │  Calculation    │
                        │    Engine       │
                        │                 │
                        │ • Bazi          │
                        │ • Liuyao        │
                        │ • Qimen         │
                        │ • Lunar         │
                        └─────────────────┘
```

### 目录结构

```
├── app/                      # Next.js App Router
│   ├── (features)/           # 功能页面
│   │   ├── bazi/             # 八字
│   │   ├── liuyao/           # 六爻
│   │   ├── synastry/         # 合婚
│   │   ├── qimen/            # 奇门遁甲
│   │   ├── tarot/            # 塔罗
│   │   └── horoscope/        # 星座
│   └── api/                  # API 路由
├── components/               # React 组件
├── lib/
│   ├── ai/                   # AI 集成
│   ├── calculations/         # 命理计算
│   ├── prompts/              # AI Prompts
│   └── conversation/         # 对话管理
├── Dockerfile
└── docker-compose.yml
```

---

## 快速开始

### 环境要求

- Node.js 20+
- npm 或 pnpm
- AI API Key (Kimi / GLM / DeepSeek 任一)

### 安装步骤

**1. 克隆仓库**

```bash
git clone <repository-url>
cd f-teller
```

**2. 安装依赖**

```bash
npm install
```

**3. 配置环境变量**

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
# 选择 AI 提供商 (kimi / glm / deepseek)
AI_PROVIDER=kimi

# Kimi API Key
ANTHROPIC_AUTH_TOKEN=your_api_key_here

# 或 GLM
GLM_API_KEY=your_glm_key_here

# 或 DeepSeek
DEEPSEEK_API_KEY=your_deepseek_key_here
```

**4. 启动开发服务器**

```bash
npm run dev
```

访问 http://localhost:3000

---

## 环境变量

### 必需配置

| 变量 | 说明 | 获取方式 |
|------|------|----------|
| `ANTHROPIC_AUTH_TOKEN` | Kimi API Key | [Kimi 开放平台](https://platform.kimi.com) |
| `GLM_API_KEY` | 智谱 AI Key | [BigModel](https://open.bigmodel.cn) |
| `DEEPSEEK_API_KEY` | DeepSeek Key | [DeepSeek](https://platform.deepseek.com) |

### 可选配置

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `AI_PROVIDER` | 默认 AI 提供商 | `kimi` |
| `ENABLE_HOROSCOPE` | 启用星座功能 | `true` |
| `ENABLE_TAROT` | 启用塔罗功能 | `true` |
| `ENABLE_BAZI` | 启用八字功能 | `true` |
| `ENABLE_QIMEN` | 启用奇门功能 | `true` |
| `ENABLE_LIUYAO` | 启用六爻功能 | `true` |
| `ENABLE_SYNASTRY` | 启用合婚功能 | `true` |

---

## 部署指南

### Docker 部署（推荐）

```bash
# 使用 docker-compose
docker-compose up -d

# 或手动构建
docker build -t fortune-telling .
docker run -p 3000:3000 \
  -e AI_PROVIDER=kimi \
  -e ANTHROPIC_AUTH_TOKEN=$API_KEY \
  fortune-telling
```

### Vercel 部署

1. Fork 本仓库到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 自动部署

### 手动部署

```bash
npm run build
npm run start
```

---

## API 接口

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/bazi` | POST | 八字计算与解读 |
| `/api/liuyao` | POST | 六爻起卦与解读 |
| `/api/synastry` | POST | 合婚分析 |
| `/api/qimen` | POST | 奇门遁甲排盘 |
| `/api/tarot` | POST | 塔罗牌解读 |
| `/api/horoscope` | POST | 星座运势 |
| `/api/ai/stream` | POST | AI 流式响应 |
| `/api/health` | GET | 健康检查 |

---

## 常见问题

<details>
<summary><b>AI API 返回 401 错误</b></summary>

检查 `.env.local` 中的 API Key 是否正确配置。
</details>

<details>
<summary><b>构建失败</b></summary>

清除依赖重新安装：

```bash
rm -rf node_modules package-lock.json
npm install
```
</details>

<details>
<summary><b>触发频率限制</b></summary>

应用默认限制 20 请求/分钟，2 并发。请适当控制请求频率。
</details>

---

## 许可证

MIT License

---

<div align="center">

Built with ancient wisdom and modern technology

</div>
