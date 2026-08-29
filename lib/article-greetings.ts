export type ArticleGreeting = {
  zh: string;
  en: string;
};

type GreetingFragment = {
  zh: string;
  en: string;
};

const OPENERS: GreetingFragment[] = [
  { zh: '願你在今天的航程裡', en: 'May your journey today' },
  { zh: '願你打開這篇報導時', en: 'As you open this report, may you' },
  { zh: '願此刻的閱讀為你', en: 'May this moment of reading' },
  { zh: '願你在新的訊息抵達時', en: 'As new information arrives, may you' },
  { zh: '願你沿著這段文字前行時', en: 'As you travel through these lines, may you' },
  { zh: '願今天的星光替你', en: 'May today’s starlight' },
  { zh: '願你從這份觀測資料中', en: 'From this field report, may you' },
  { zh: '願這則來自遠方的消息', en: 'May this message from afar' },
  { zh: '願你在理解世界的路上', en: 'As you seek to understand the world, may you' },
  { zh: '願這一頁新聞替你', en: 'May this page of news' },
  { zh: '願你以清醒而柔軟的心', en: 'With a clear and gentle mind, may you' },
  { zh: '願每一段真實的記錄都能', en: 'May every truthful record' },
  { zh: '願你在紛雜的聲音之間', en: 'Amid the world’s many voices, may you' },
  { zh: '願這個來自地球的訊號', en: 'May this signal from Earth' },
  { zh: '願你用自己的步調', en: 'At your own pace, may you' },
  { zh: '願今天所見的事件', en: 'May the events you encounter today' },
  { zh: '願你在新聞與生活之間', en: 'Between news and daily life, may you' },
  { zh: '願這段文字在你心中', en: 'May these words in your mind' },
  { zh: '願你從不同角度看見', en: 'May you see, from another angle,' },
  { zh: '願這一次短暫的停留', en: 'May this brief pause' },
  { zh: '願你讀完這篇文章後', en: 'After reading this article, may you' },
  { zh: '願每個值得追問的細節', en: 'May every detail worth questioning' },
  { zh: '願你在變動的時代裡', en: 'In a changing era, may you' },
  { zh: '願這份報導帶你', en: 'May this report guide you toward' },
  { zh: '願你與世界保持連線時', en: 'While staying connected to the world, may you' },
];

const ENDINGS: GreetingFragment[] = [
  { zh: '找到一個值得微笑的理由。', en: 'bring you one reason worth smiling about.' },
  { zh: '看見平凡裡不平凡的光。', en: 'help you notice extraordinary light in the ordinary.' },
  { zh: '把重要的事溫柔地放在心上。', en: 'help you hold what matters with gentleness.' },
  { zh: '遇見一個讓思緒變清澈的片刻。', en: 'bring you a moment that clears your thoughts.' },
  { zh: '讓一個小小的完成替你點亮信心。', en: 'let one small completion light your confidence.' },
  { zh: '在前進之前也記得照顧自己。', en: 'remind you to care for yourself before moving ahead.' },
  { zh: '把複雜的問題拆成可以呼吸的步伐。', en: 'help you turn hard questions into steps you can breathe through.' },
  { zh: '保留一點空白讓好消息有地方抵達。', en: 'leave room for good news to arrive.' },
  { zh: '用自己的速度抵達真正重要的地方。', en: 'help you reach what truly matters at your own pace.' },
  { zh: '在不確定裡仍然相信自己的判斷。', en: 'help you trust your judgment inside uncertainty.' },
  { zh: '讓一次真誠的交流成為今天的座標。', en: 'let one sincere exchange become today’s coordinates.' },
  { zh: '記得你不必一次解完整個宇宙。', en: 'remind you that you need not solve the whole universe at once.' },
  { zh: '把疲憊放下片刻再重新校準方向。', en: 'give you space to set weariness down and recalibrate.' },
  { zh: '迎接一個比預期更好的轉折。', en: 'help you welcome a turn better than expected.' },
  { zh: '讓安靜也成為一種可靠的力量。', en: 'let quietness become a reliable kind of strength.' },
  { zh: '在細節裡收集足以支撐你的勇氣。', en: 'help you gather courage in the details.' },
  { zh: '以清醒的眼光選擇值得投入的方向。', en: 'help you choose where to invest yourself with clear eyes.' },
  { zh: '把一個善意的念頭化成實際行動。', en: 'turn one kind thought into a real action.' },
  { zh: '為自己留下一段不被打擾的時間。', en: 'save a stretch of time that belongs only to you.' },
  { zh: '在每個新訊號裡找到可用的智慧。', en: 'help you find useful wisdom in every new signal.' },
];

export const ARTICLE_GREETINGS: ArticleGreeting[] = OPENERS.flatMap((opener) =>
  ENDINGS.map((ending) => ({
    zh: `${opener.zh}，${ending.zh}`,
    en: `${opener.en} ${ending.en}`,
  })),
);

function stableHash(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function getArticleGreetings(slug: string) {
  const topIndex = stableHash(slug) % ARTICLE_GREETINGS.length;
  const bottomIndex = (topIndex + 251) % ARTICLE_GREETINGS.length;
  return {
    top: ARTICLE_GREETINGS[topIndex],
    bottom: ARTICLE_GREETINGS[bottomIndex],
  };
}
