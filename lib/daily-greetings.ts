export type DailyGreeting = {
  zh: string;
  en: string;
};

const CONTEXTS = [
  { zh: '晨光裡', en: 'the morning light' },
  { zh: '午後的空檔裡', en: 'an open space in the afternoon' },
  { zh: '晚霞染上的片刻裡', en: 'a moment painted by the evening sky' },
  { zh: '安靜的呼吸之間', en: 'the space between quiet breaths' },
  { zh: '忙碌的訊號之間', en: 'the day’s busy signals' },
  { zh: '一段短暫的等待裡', en: 'a brief moment of waiting' },
  { zh: '新的想法抵達時', en: 'when a new idea arrives' },
  { zh: '熟悉的日常轉身時', en: 'when the familiar day turns' },
  { zh: '遠方星光仍亮著時', en: 'while distant starlight remains visible' },
  { zh: '今天即將收束之前', en: 'before today comes to a close' },
];

const ENDINGS: DailyGreeting[] = [
  { zh: '找到一個值得微笑的理由。', en: 'find one reason worth smiling about.' },
  { zh: '看見平凡裡不平凡的光。', en: 'notice extraordinary light in the ordinary.' },
  { zh: '把重要的事，溫柔地放在心上。', en: 'hold what matters with gentleness.' },
  { zh: '遇見一個讓思緒變清澈的片刻。', en: 'meet a moment that clears your thoughts.' },
  { zh: '讓一個小小的完成，替你點亮信心。', en: 'let one small completion light your confidence.' },
  { zh: '在前進之前，也記得照顧自己。', en: 'remember to care for yourself before moving ahead.' },
  { zh: '把今天的難題拆成可以呼吸的步伐。', en: 'turn today’s hard questions into steps you can breathe through.' },
  { zh: '保留一點空白，讓好消息有地方抵達。', en: 'leave room for good news to arrive.' },
  { zh: '用自己的速度，抵達真正重要的地方。', en: 'reach what truly matters at your own pace.' },
  { zh: '在不確定裡仍然相信自己的判斷。', en: 'trust your judgment even inside uncertainty.' },
  { zh: '讓一次真誠的交流，成為今天的座標。', en: 'let one sincere exchange become today’s coordinates.' },
  { zh: '記得你不必一次解完整個宇宙。', en: 'remember that you do not have to solve the whole universe at once.' },
  { zh: '把疲憊放下片刻，再重新校準方向。', en: 'set weariness down for a moment and recalibrate your course.' },
  { zh: '迎接一個比預期更好的轉折。', en: 'welcome a turn better than expected.' },
  { zh: '讓安靜也成為一種可靠的力量。', en: 'let quietness become a reliable kind of strength.' },
  { zh: '在細節裡收集足以支撐你的勇氣。', en: 'gather enough courage in the details to support you.' },
  { zh: '以清醒的眼光，選擇值得投入的方向。', en: 'choose where to invest yourself with clear eyes.' },
  { zh: '把一個善意的念頭化成實際行動。', en: 'turn one kind thought into a real action.' },
  { zh: '為自己留下一段不被打擾的時間。', en: 'save a stretch of time that belongs only to you.' },
  { zh: '在每個新訊號裡，找到可用的智慧。', en: 'find useful wisdom in every new signal.' },
  { zh: '承認自己的努力，哪怕進度很慢。', en: 'acknowledge your effort, even when progress is slow.' },
  { zh: '讓今天的選擇更接近你相信的生活。', en: 'let today’s choices move closer to the life you believe in.' },
  { zh: '把一份期待交給時間，也交給自己。', en: 'entrust one hope to time, and to yourself.' },
  { zh: '在需要的時候，勇敢地按下暫停。', en: 'press pause bravely when you need to.' },
  { zh: '看見自己已經走過的距離。', en: 'recognize how far you have already travelled.' },
  { zh: '讓今天的風，把新的可能帶到身邊。', en: 'let today’s wind bring a new possibility near.' },
  { zh: '用一點幽默，替嚴肅的世界留口氣。', en: 'leave the serious world room to breathe with a little humor.' },
  { zh: '相信一次小小的修正也能改變航向。', en: 'believe that one small correction can change the course.' },
  { zh: '不急著證明自己，先好好感受當下。', en: 'feel the present fully before rushing to prove yourself.' },
  { zh: '把今天遇見的人事，化成溫柔的記憶。', en: 'turn today’s encounters into gentle memories.' },
  { zh: '在喧鬧之外，聽見自己的答案。', en: 'hear your own answer beyond the noise.' },
  { zh: '讓一件值得的事情，獲得完整的專注。', en: 'give one worthwhile thing your full attention.' },
  { zh: '在結束之前，發現今天其實已經足夠。', en: 'discover before the end that today is already enough.' },
  { zh: '把希望放在可以行動的地方。', en: 'place hope where action is possible.' },
  { zh: '用平靜迎接變化，用勇氣保護溫柔。', en: 'meet change with calm and protect gentleness with courage.' },
  { zh: '替明天留下比今天更好的起點。', en: 'leave tomorrow a better starting point than today.' },
  { zh: '記得你的存在，本身就是一道訊號。', en: 'remember that your presence is a signal in itself.' },
];

export const DAILY_GREETINGS: DailyGreeting[] = Array.from({ length: 365 }, (_, index) => {
  const context = CONTEXTS[Math.floor(index / ENDINGS.length) % CONTEXTS.length];
  const ending = ENDINGS[index % ENDINGS.length];
  return {
    zh: `願你今天在${context.zh}，${ending.zh}`,
    en: `Today, in ${context.en}, may you ${ending.en}`,
  };
});

function isLeapYear(year: number) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function getDailyGreeting(date: Date) {
  const year = date.getFullYear();
  const start = Date.UTC(year, 0, 1);
  const current = Date.UTC(year, date.getMonth(), date.getDate());
  let dayIndex = Math.floor((current - start) / 86_400_000);
  const month = date.getMonth();
  const day = date.getDate();
  if (isLeapYear(year) && (month > 1 || (month === 1 && day === 29))) dayIndex -= 1;
  return DAILY_GREETINGS[Math.max(0, Math.min(364, dayIndex))];
}
