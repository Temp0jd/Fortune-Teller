export const HOROSCOPE_SYSTEM_PROMPT = `你是一位拥有二十年经验的资深星座占星师，深谙西方占星学精髓。

你的说话风格：
- 温润如玉，像一位知心姐姐/哥哥般娓娓道来
- 既有占星师的专业洞见，又不失人情味
- 善用比喻和意象，让星象语言变得生动可感
- 不贩卖焦虑，而是给予温暖的指引

解读原则：
1. 先感受，后分析——从行星能量的整体氛围说起
2. 结合星座的守护星、元素属性深入解读
3. 运势不是宿命，而是宇宙给你的"天气预告"
4. 每个维度都要给出可落地的建议，而非泛泛而谈
5. 评分用 ⭐-⭐⭐⭐⭐⭐（1-5星）表示，附简短评语

输出结构：
🌟 整体星象氛围（用诗意语言描绘今天的宇宙能量）

💝 爱情运势
评分：⭐⭐⭐⭐⭐
解读：...
建议：...

💼 事业运势
评分：⭐⭐⭐⭐⭐
解读：...
建议：...

💰 财富运势
评分：⭐⭐⭐⭐⭐
解读：...
建议：...

🌱 健康运势
评分：⭐⭐⭐⭐⭐
解读：...
建议：...

✨ 今日幸运元素
幸运数字：...
幸运颜色：...
幸运方位：...
开运小物：...

📝 今日箴言
一句温暖的提醒或鼓励`;

export function generateHoroscopePrompt(
  zodiacSign: string,
  period: 'daily' | 'weekly' | 'monthly',
  date: Date
): string {
  const periodText = {
    daily: '今日',
    weekly: '本周',
    monthly: '本月',
  };

  const zodiacInsights: Record<string, string> = {
    '白羊座': '火象开创星座，守护星火星，天生具有开拓精神和行动力',
    '金牛座': '土象固定星座，守护星金星，稳重务实且追求品质',
    '双子座': '风象变动星座，守护星水星，机敏好奇且善于沟通',
    '巨蟹座': '水象开创星座，守护星月亮，情感丰富且重视家庭',
    '狮子座': '火象固定星座，守护星太阳，自信热情且富有创造力',
    '处女座': '土象变动星座，守护星水星，追求完美且注重细节',
    '天秤座': '风象开创星座，守护星金星，优雅和谐且重视关系',
    '天蝎座': '水象固定星座，守护星冥王星，深邃神秘且洞察力强',
    '射手座': '火象变动星座，守护星木星，乐观开朗且追求自由',
    '摩羯座': '土象开创星座，守护星土星，务实进取且有责任感',
    '水瓶座': '风象固定星座，守护星天王星，独立创新且富有人道精神',
    '双鱼座': '水象变动星座，守护星海王星，感性浪漫且富有想象力',
  };

  return `请为${zodiacSign}解读${periodText[period]}运势。

时间：${date.toLocaleDateString('zh-CN')} ${periodText[period] === '今日' ? '' : `(${periodText[period]})`}

星座特质：${zodiacInsights[zodiacSign] || '独特的星座能量'}

请以资深占星师的身份，结合当前星象（日月位置、主要行星相位），为${zodiacSign}的朋友提供温暖而专业的运势指引。`;
}

// 星座信息
export const ZODIAC_SIGNS = [
  { name: '白羊座', date: '3.21-4.19', element: '火', planet: '火星', icon: '♈' },
  { name: '金牛座', date: '4.20-5.20', element: '土', planet: '金星', icon: '♉' },
  { name: '双子座', date: '5.21-6.21', element: '风', planet: '水星', icon: '♊' },
  { name: '巨蟹座', date: '6.22-7.22', element: '水', planet: '月亮', icon: '♋' },
  { name: '狮子座', date: '7.23-8.22', element: '火', planet: '太阳', icon: '♌' },
  { name: '处女座', date: '8.23-9.22', element: '土', planet: '水星', icon: '♍' },
  { name: '天秤座', date: '9.23-10.23', element: '风', planet: '金星', icon: '♎' },
  { name: '天蝎座', date: '10.24-11.22', element: '水', planet: '冥王星', icon: '♏' },
  { name: '射手座', date: '11.23-12.21', element: '火', planet: '木星', icon: '♐' },
  { name: '摩羯座', date: '12.22-1.19', element: '土', planet: '土星', icon: '♑' },
  { name: '水瓶座', date: '1.20-2.18', element: '风', planet: '天王星', icon: '♒' },
  { name: '双鱼座', date: '2.19-3.20', element: '水', planet: '海王星', icon: '♓' },
] as const;

export type ZodiacSign = typeof ZODIAC_SIGNS[number]['name'];
