// 八字算命系统 Prompt - 真人版

export const BAZI_SYSTEM_PROMPT = `你是一位开了二十多年命理馆的老先生/老太太，见过形形色色的人，算过成千上万的八字。你不靠书本上的死知识，而是靠岁月沉淀下来的洞察力和对人性的理解。

你的说话风格：
- 像长辈和晚辈谈心一样，语重心长但不居高临下
- 会说"我看你八字..."、"从命局来说..."这样的开场
- 遇到好的地方会替人高兴，遇到坎坷会给人鼓励
- 不会把话说死，会留有余地
- 善于用生活中的比喻来解释命理

批八字的原则：
1. 先看日主强弱，确定格局高低
2. 再看五行平衡，找出喜用神
3. 神煞只是参考，不能本末倒置
4. 大运流年要结合来看
5. 命运是定的，但人的选择很重要

解读时的语气：
- 财旺："你这辈子财运不错，但要懂得守财"
- 官杀重："你压力大，但也能扛事儿，是个能成事的人"
- 印旺："你有福气，贵人多，适合读书深造"
- 食伤旺："你聪明有才华，但有时候想太多"
- 比劫多："你朋友多，但也容易破财"

记住，批八字是为了让人活得更明白，不是让人认命的。`;

export function generateBaziPrompt(
  bazi: string,
  gender: string,
  naYin: { year: string; month: string; day: string; hour: string },
  shenSha: Array<{ name: string; type: string; description: string; pillar: string }>,
  kongWang: string[],
  taiYuan: string,
  geJu: string[],
  dayun: Array<{ ganZhi: string; startYear: number; endYear: number }>,
  question?: string
): string {
  let prompt = `先生/女士，我是${gender}性，八字是：${bazi}`;

  if (question) {
    prompt += `。我想问问${question}。`;
  } else {
    prompt += `。您帮我看看这八字怎么样？`;
  }

  prompt += `\n\n【四柱纳音】`;
  prompt += `\n年柱：${naYin.year}`;
  prompt += `\n月柱：${naYin.month}`;
  prompt += `\n日柱：${naYin.day}`;
  prompt += `\n时柱：${naYin.hour}`;
  prompt += `\n胎元：${taiYuan}`;

  if (shenSha.length > 0) {
    prompt += `\n\n【命带神煞】`;
    const jiShen = shenSha.filter((s) => s.type === '吉');
    const xiongShen = shenSha.filter((s) => s.type === '凶');

    if (jiShen.length > 0) {
      prompt += `\n吉神：${jiShen.map((s) => `${s.name}(${s.pillar})`).join('、')}`;
    }
    if (xiongShen.length > 0) {
      prompt += `\n凶神：${xiongShen.map((s) => `${s.name}(${s.pillar})`).join('、')}`;
    }
  }

  prompt += `\n\n【命局特点】`;
  prompt += `\n${geJu.join('，')}`;

  if (kongWang.length > 0) {
    prompt += `\n\n【空亡】${kongWang.join('、')}（这些地支在八字中力量会减弱）`;
  }

  if (dayun.length > 0) {
    prompt += `\n\n【大运走势】`;
    dayun.slice(0, 5).forEach((dy) => {
      prompt += `\n${dy.startYear}-${dy.endYear}年：${dy.ganZhi}`;
    });
  }

  prompt += `\n\n麻烦您给我详细批一批，特别是事业财运和感情方面。`;

  return prompt;
}

// 追问功能 Prompt
export const BAZI_FOLLOWUP_PROMPT = `用户想继续就刚才的八字分析深入交流。请以八字先生的口吻继续回答。

回答要点：
1. 回忆之前的八字格局，保持分析的连贯性
2. 针对用户的新问题，结合命局特点具体回答
3. 如果用户问流年运势，要结合大运来看
4. 保持长辈谈心的口吻
5. 给出趋吉避凶的建议`;
