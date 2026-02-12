export const SYNASTRY_SYSTEM_PROMPT = `你是一位资深的情感命理咨询师，精通星座合盘与八字合婚，善于从命理角度解读人际关系的深层动力。

你的咨询风格：
- 客观温暖，既不盲目乐观也不刻意恐吓
- 把复杂的命理概念用易懂的语言解释
- 既看到两人的契合点，也指出需要磨合的地方
- 最终目的是帮助人更好地理解关系、经营关系
- 像一位知心姐姐/哥哥，既有专业性又有同理心

分析维度：
1. 整体能量场：两人在一起时的整体氛围
2. 性格互补：太阳星座/生肖的互补与冲突
3. 情感模式：月亮星座/八字日支的情感需求
4. 沟通方式：水星/天干地支的互动方式
5. 价值观念：金星/十神的价值取向
6. 潜在挑战：可能出现的问题及化解方法

输出结构：
💫 整体契合度
用 0-100 分表示，并简述这个分数的含义（例如：70分表示需要磨合但很有潜力）

🌟 性格契合分析
- 互补之处：两人性格上如何互相补充
- 潜在摩擦：哪些性格差异可能引发矛盾
- 相处建议：如何更好地理解和包容对方

💝 情感发展预测
根据关系类型侧重分析：
- 恋爱/婚姻：情感需求匹配度、亲密模式
- 友情：志趣相投程度、信任基础
- 合作：价值观契合度、分工建议
- 家人：代际差异、相处之道

⚡ 需要注意的节点
指出未来可能出现挑战的时期或情境，以及应对方法

📝 经营这段关系的三个建议
具体、可操作的建议，而非空泛的鸡汤

✨ 结语
一句温暖的祝福或提醒`;

export type RelationshipType = "romance" | "marriage" | "friendship" | "work" | "family";

export function generateSynastryPrompt(
  type: "zodiac" | "bazi" | "combined",
  date1: Date,
  date2: Date,
  relationshipType?: RelationshipType,
  zodiacData?: {
    sign1: string;
    sign2: string;
    element1: string;
    element2: string;
    score: number;
  },
  baziData?: {
    bazi1: string;
    bazi2: string;
    zodiac1: string;
    zodiac2: string;
    score: number;
    tianganHe: number;
    dizhiHe: number;
    dizhiSanhe: number;
    dizhiChong: number;
  }
): string {
  const relationshipText: Record<RelationshipType, string> = {
    romance: "恋爱关系",
    marriage: "婚姻关系",
    friendship: "朋友关系",
    work: "事业合作",
    family: "家人关系",
  };

  const typeMap = {
    zodiac: "星座合盘",
    bazi: "八字合婚",
    combined: "综合合盘",
  };

  let prompt = `请进行${typeMap[type]}分析\n\n`;

  if (relationshipType) {
    prompt += `💑 关系类型：${relationshipText[relationshipType]}\n\n`;
  }

  prompt += `📅 双方信息\n`;
  prompt += `第一人出生日期：${date1.toLocaleDateString("zh-CN")}\n`;
  prompt += `第二人出生日期：${date2.toLocaleDateString("zh-CN")}\n\n`;

  if (zodiacData) {
    prompt += `🌟 【星座合盘数据】\n`;
    prompt += `第一星座：${zodiacData.sign1}（${zodiacData.element1}象星座）\n`;
    prompt += `第二星座：${zodiacData.sign2}（${zodiacData.element2}象星座）\n`;
    prompt += `星座配对指数：${zodiacData.score}/100\n`;
    prompt += `四象分析：${zodiacData.element1}象与${zodiacData.element2}象的\n\n`;
  }

  if (baziData) {
    prompt += `🎋 【八字合婚数据】\n`;
    prompt += `第一人生肖：${baziData.zodiac1}\n`;
    prompt += `第一人八字：${baziData.bazi1}\n`;
    prompt += `第二人生肖：${baziData.zodiac2}\n`;
    prompt += `第二人八字：${baziData.bazi2}\n`;
    prompt += `八字合婚指数：${baziData.score}/100\n`;
    prompt += `天干相合：${baziData.tianganHe}处（代表性格层面的契合）\n`;
    prompt += `地支相合：${baziData.dizhiHe}处（代表生活层面的和谐）\n`;
    prompt += `地支三合：${baziData.dizhiSanhe}处（代表机缘和助力）\n`;
    prompt += `地支相冲：${baziData.dizhiChong}处（代表需要磨合的地方）\n\n`;
  }

  prompt += `请以资深情感命理咨询师的身份，结合${relationshipType ? relationshipText[relationshipType] : "双方"}的特点，提供温暖而专业的合盘分析报告。`;

  return prompt;
}

export const RELATIONSHIP_TYPES = [
  { id: "romance" as const, label: "恋爱", description: "感情发展、配对分析" },
  { id: "marriage" as const, label: "婚姻", description: "婚姻契合度、长久发展" },
  { id: "friendship" as const, label: "友情", description: "友谊分析、相处之道" },
  { id: "work" as const, label: "合作", description: "事业合作、共事关系" },
  { id: "family" as const, label: "家人", description: "家庭关系、亲情分析" },
] as const;
