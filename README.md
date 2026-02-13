<div align="center">

# 🔮 F-Teller

### *AI智能命理占卜平台*

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js 16">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS 4">
</p>

<p align="center">
  <b>融合古老东方命理智慧与现代 AI 技术</b>
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#ai角色">AI角色</a> •
  <a href="#部署">部署</a> •
  <a href="#api">API</a>
</p>

</div>

---

## ✨ 功能特性

### 七大占卜模块

<table>
<tr>
<td width="33%" align="center">

📅 **老黄历**
每日宜忌查询
农历信息 | 二十八宿
彭祖百忌 | 吉神凶煞

</td>
<td width="33%" align="center">

♈ **星座运势**
十二星座运势
日/周/月预测
星座配对分析

</td>
<td width="33%" align="center">

🎴 **塔罗牌**
经典韦特牌阵
AI智能解读
单张/三张/凯尔特十字

</td>
</tr>
<tr>
<td width="33%" align="center">

☯️ **八字算命**
四柱八字排盘
十神五行分析
大运流年推算

</td>
<td width="33%" align="center">

🌀 **奇门遁甲**
九宫格排盘
八门九星配置
时辰吉凶分析

</td>
<td width="33%" align="center">

⚡ **六爻预测**
周易六爻占卜
起卦解卦
AI智能断卦

</td>
</tr>
<tr>
<td width="33%" align="center">

💕 **合盘分析**
双人配对分析
八字合婚
星座合盘

</td>
<td width="33%" align="center">

🤖 **AI追问模式**
支持连续对话
上下文记忆
最多10轮追问

</td>
<td width="33%" align="center">

⚙️ **多AI支持**
Kimi | Anthropic
GLM | DeepSeek
一键切换

</td>
</tr>
</table>

---

## 🎭 AI角色

每个模块都有独特的 AI 角色人设，提供专业且有趣的解读体验：

| 模块 | AI角色 | 风格特点 |
|------|--------|----------|
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
- AI API Key (Kimi/Anthropic/GLM/DeepSeek 任一)

### 安装步骤

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

## ⚙️ 环境变量

### 必需配置

| 变量 | 说明 | 示例 |
|------|------|------|
| `AI_PROVIDER` | AI提供商 | `kimi`, `deepseek`, `glm` |
| `AI_API_KEY` | API密钥 | `sk-...` |

### 提供商配置示例

**DeepSeek (推荐)**
```env
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=your_api_key
DEEPSEEK_BASE_URL=https://api.deepseek.com
```

**Kimi**
```env
AI_PROVIDER=kimi
ANTHROPIC_AUTH_TOKEN=your_api_key
ANTHROPIC_BASE_URL=https://api.kimi.com/coding/
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
├── app/
│   ├── (features)/          # 功能页面
│   │   ├── bazi/            # 八字
│   │   ├── huangli/         # 老黄历
│   │   ├── horoscope/       # 星座
│   │   ├── tarot/           # 塔罗
│   │   ├── qimen/           # 奇门
│   │   ├── liuyao/          # 六爻
│   │   └── synastry/        # 合盘
│   └── api/                 # API路由
├── components/              # 组件
├── lib/
│   ├── ai/                  # AI提供商
│   ├── calculations/        # 命理计算
│   ├── prompts/             # AI提示词
│   └── conversation/        # 对话管理
└── public/tarot-cards/      # 塔罗牌图片
```

---

## 🐳 部署

### Docker Compose (推荐)

```bash
# 配置环境
cp .env.example .env
# 编辑 .env 填入API密钥

# 启动
docker-compose up -d
```

### 手动部署

```bash
# 构建
npm run build

# 启动
npm start
```

---

## 🔌 API接口

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/bazi` | POST | 八字计算与解读 |
| `/api/huangli` | POST | 老黄历查询 |
| `/api/horoscope` | POST | 星座运势 |
| `/api/tarot` | POST | 塔罗解读 |
| `/api/qimen` | POST | 奇门排盘 |
| `/api/liuyao` | POST | 六爻起卦 |
| `/api/synastry` | POST | 合盘分析 |

### 请求示例

**八字计算（纯排盘）**
```bash
curl -X POST http://localhost:3000/api/bazi \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-01-01T00:00:00.000Z",
    "gender": "male"
  }'
```

**八字AI解读**
```bash
curl -X POST http://localhost:3000/api/bazi \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "为张三进行八字分析...",
    "isFollowUp": false
  }'
```

---

## 🛡️ 限流保护

| 限制类型 | 默认值 | 说明 |
|----------|--------|------|
| 请求频率 | 20/分钟 | 每IP每分钟最多请求 |
| 并发请求 | 2 | 同时处理的最大请求数 |
| 请求间隔 | 5秒 | 两次请求最小间隔 |
| 追问次数 | 10/天 | 每会话每天最多追问 |

---

## 🛠️ 技术栈

- **框架**: Next.js 16 + React 19
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4 + shadcn/ui
- **状态管理**: Zustand
- **动画**: Framer Motion
- **AI SDK**: Vercel AI SDK
- **农历计算**: lunar-typescript

---

## 📄 许可证

MIT License

---

<div align="center">

**Built with ancient wisdom and modern technology** 🔮

</div>
