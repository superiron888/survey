export interface SurveyQuestion {
  id: number;
  type: 'single_choice' | 'multiple_choice' | 'ranking' | 'open_text';
  title: string;
  options?: string[];
  allowOtherText?: boolean;
  otherPlaceholder?: string;
  touch?: string;
  required?: boolean;
  placeholder?: string;
}

export interface Survey {
  surveyName: string;
  description: string;
  questions: SurveyQuestion[];
}

export const INVESTMENT_SURVEY: Survey = {
  surveyName: "投资觉察 · 用户画像与盲点诊断 V2",
  description: "这不是一份普通问卷，而是一场关于你当前投资状态的自我对话。",
  questions: [
    {
      id: 1,
      type: "single_choice",
      title: "以下哪种描述，更贴近你现在所处的人生阶段？",
      options: [
        "刚起步，在摸索方向（18-24）",
        "基本站稳，开始进阶（25–30）",
        "责任上身，追求突破（31–40）",
        "稳定积累，管理风险（41–50）",
        "收官布局，守成增值（50+）"
      ],
      touch: "你不是在选年龄，而是在选此刻的自己。",
      required: true
    },
    {
      id: 2,
      type: "single_choice",
      title: "你的性别是？",
      options: [
        "男",
        "女",
        "不方便透露"
      ],
      required: true
    },
    {
      id: 3,
      type: "single_choice",
      title: "当你的持仓短期下跌 15% 时，你最可能的真实反应是？",
      options: [
        "本能止损，先保命",
        "反复犹豫，继续观望",
        "理性分析，适当加仓",
        "情绪兴奋，大幅加注"
      ],
      touch: "压力之下的第一反应，比任何性格标签都诚实。",
      required: true
    },
    {
      id: 4,
      type: "single_choice",
      title: "如果只能选择一条你当前最重要的投资路径，那会是？",
      options: [
        "稳稳积累，长期复利",
        "提高收益，接受波动",
        "优先养老安全",
        "尽快实现财务自由",
        "可持续现金流",
        "还没想清楚"
      ],
      touch: "被迫单选时，你才知道内心真正要什么。",
      required: true
    },
    {
      id: 5,
      type: "multiple_choice",
      title: "你现在主要关注或参与的投资领域有哪些？",
      options: [
        "股票 / ETF",
        "基金",
        "加密资产",
        "期货 / 期权",
        "其他"
      ],
      allowOtherText: true,
      touch: "关注在哪里，风险感应力就在哪里。",
      required: true
    },
    {
      id: 6,
      type: "single_choice",
      title: "你当前的投资规模，更贴近哪个状态？",
      options: [
        "刚起步试水",
        "有一定本金",
        "开始系统布局",
        "规模化管理",
        "已进入资产配置阶段"
      ],
      touch: "规模不仅是数字，更是你的操作半径。",
      required: true
    },
    {
      id: 7,
      type: "single_choice",
      title: "你接触投资市场大概有多久？",
      options: [
        "不到 1 年",
        "1–3 年",
        "3–5 年",
        "5 年以上"
      ],
      touch: "时间越长，越看得出你走过哪些弯路。",
      required: true
    },
    {
      id: 8,
      type: "single_choice",
      title: "你通常多久会查看自己的投资或行情？",
      options: [
        "一天多次",
        "每天一次",
        "每周几次",
        "偶尔才看"
      ],
      touch: "查看频率，就是你与不确定性相处的方式。",
      required: true
    },
    {
      id: 9,
      type: "single_choice",
      title: "对比三年前的自己，你更接近哪种变化？",
      options: [
        "心态明显成熟了",
        "技术进步，但情绪没变",
        "变得更焦虑",
        "更佛系、更摆烂",
        "说不上来"
      ],
      touch: "投资成长，首先是心智成长。",
      required: true
    },
    {
      id: 10,
      type: "multiple_choice",
      title: "当你犹豫是否操作时，最容易卡住你的真实障碍是？",
      options: [
        "怕亏损 → 不敢下手",
        "怕错过 → 冲动追高",
        "信息太多 → 无法判断",
        "不会择时 → 一拖再拖",
        "过去亏过 → 心态变形",
        "对自己没信心 → 跟风操作"
      ],
      touch: "你卡住的地方，就是你的投资盲区。",
      required: true
    },
    {
      id: 11,
      type: "multiple_choice",
      title: "你主要依赖哪些信息来源做决策？",
      options: [
        "社交媒体观点",
        "KOL / 主播",
        "自己系统研究",
        "朋友推荐",
        "机构研报",
        "AI / 智能工具"
      ],
      allowOtherText: true,
      otherPlaceholder: "可填写具体关注的账号或网站",
      touch: "你信什么，决定你怎么看世界。",
      required: true
    },
    {
      id: 12,
      type: "single_choice",
      title: "所谓回撤是指：账户浮亏到一定程度时，你还睡得着觉吗？你可以接受的最大短期回撤是？",
      options: [
        "5%",
        "10%",
        "20%",
        "30% 以上"
      ],
      touch: "回撤阈值，就是你的心理安全边界。",
      required: true
    },
    {
      id: 13,
      type: "multiple_choice",
      title: "你当前实际持有的资产类型有？",
      options: [
        "现金",
        "股票 / ETF",
        "基金",
        "加密资产",
        "债券 / 固收",
        "其他"
      ],
      allowOtherText: true,
      touch: "持仓比语言更诚实。",
      required: true
    },
    {
      id: 14,
      type: "ranking",
      title: "当以下价值不可兼得时，请按你真实取舍顺序排序",
      options: [
        "收益",
        "风险控制",
        "流动性",
        "学习与成长",
        "财富稳定感"
      ],
      touch: "每一次排序，都是和内心价值的对话。",
      required: true
    },
    {
      id: 15,
      type: "single_choice",
      title: "你的主要收入来源更接近哪一种？",
      options: [
        "工资",
        "创业 / 自由职业",
        "投资收益",
        "家庭支持",
        "其他"
      ],
      touch: "收入结构决定你的安全垫厚度。",
      required: true
    },
    {
      id: 16,
      type: "single_choice",
      title: "你理想的投资节奏更接近？",
      options: [
        "稳稳向上",
        "可接受波动",
        "愿承受较大波动",
        "热点进出型"
      ],
      touch: "投资节奏，往往映射人生节奏。",
      required: true
    },
    {
      id: 17,
      type: "single_choice",
      title: "你愿意为投资持续投入的时间大概是？",
      options: [
        "每天 1 小时以上",
        "每天 10–30 分钟",
        "每周 1 小时",
        "越少越好，重在结果"
      ],
      touch: "时间投入，就是你对未来的下注比例。",
      required: true
    },
    {
      id: 18,
      type: "single_choice",
      title: "你对智能投资/自动化工具的态度是？",
      options: [
        "非常愿意使用",
        "愿意尝试",
        "不太愿意",
        "不会使用"
      ],
      touch: "你是否愿意把部分控制权交给系统？",
      required: true
    },
    {
      id: 19,
      type: "multiple_choice",
      title: "你最希望获得哪类投资支持？",
      options: [
        "清晰的买卖参考",
        "系统化方法框架",
        "资产配置逻辑",
        "情绪管理陪伴",
        "热点追踪解读",
        "投资者社群"
      ],
      touch: "你渴望的支持，正是你想跨越的关口。",
      required: true
    },
    {
      id: 20,
      type: "single_choice",
      title: "你对当前投资体验最不满意的是？",
      options: [
        "信息太杂乱",
        "内容难理解",
        "决策没依据",
        "工具太复杂",
        "收益不稳定",
        "缺乏成长指引"
      ],
      touch: "最真实的痛点，往往指向你下一步的突破口。",
      required: true
    },
    {
      id: 21,
      type: "open_text",
      title: "如果只能问你一句：你现在在投资上，最想解决的'卡点'是什么？",
      placeholder: "比如：不知道怎么买卖、心态动不动就崩、总跟风、没时间学、资金太少等……可以随便聊几句",
      touch: "你愿意认真写下的问题，通常已经在你心里发酵很久了。",
      required: false
    }
  ]
};

export const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

export const ZODIAC_SIGNS = [
  '白羊座', '金牛座', '双子座', '巨蟹座',
  '狮子座', '处女座', '天秤座', '天蝎座',
  '射手座', '摩羯座', '水瓶座', '双鱼座'
];
