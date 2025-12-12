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
  alwaysShowInput?: boolean;
  inputPlaceholder?: string;
  inputNote?: string;
}

export interface Survey {
  surveyName: string;
  description: string;
  questions: SurveyQuestion[];
}

export const INVESTMENT_SURVEY: Survey = {
  surveyName: "Investment Awareness · User Profile & Blind Spot Diagnosis V2",
  description: "This is not an ordinary survey, but a self-dialogue about your current investment state.",
  questions: [
    {
      id: 1,
      type: "single_choice",
      title: "Which description best matches your current life stage?",
      options: [
        "Just starting out (18-24)",
        "Basically stable (25-30)",
        "Responsibilities increasing (31-40)",
        "Stable accumulation (41-50)",
        "Finalizing layout (50+)"
      ],
      touch: "You're not choosing an age, but choosing who you are right now.",
      required: true
    },
    {
      id: 2,
      type: "single_choice",
      title: "What is your gender?",
      options: [
        "Male",
        "Female",
        "Prefer not to say"
      ],
      required: true
    },
    {
      id: 3,
      type: "single_choice",
      title: "When your portfolio drops 15% in the short term, what is your most likely real reaction?",
      options: [
        "Instinctively cut losses",
        "Hesitate repeatedly",
        "Analyze rationally, add positions",
        "Get emotionally excited"
      ],
      touch: "Your first reaction under pressure is more honest than any personality label.",
      required: true
    },
    {
      id: 4,
      type: "single_choice",
      title: "If you could only choose one most important investment path right now, what would it be?",
      options: [
        "Steady accumulation",
        "Increase returns, accept volatility",
        "Prioritize retirement security",
        "Financial freedom ASAP",
        "Sustainable cash flow",
        "Haven't figured it out yet"
      ],
      touch: "When forced to choose one, you know what you really want.",
      required: true
    },
    {
      id: 5,
      type: "multiple_choice",
      title: "What investment areas are you currently mainly focusing on or participating in?",
      options: [
        "Stocks / ETF",
        "Funds",
        "Crypto assets",
        "Futures / Options",
        "Other"
      ],
      allowOtherText: true,
      touch: "Where you focus, your risk sensitivity is there.",
      required: true
    },
    {
      id: 6,
      type: "single_choice",
      title: "Which state best matches your current investment scale?",
      options: [
        "Just starting to test",
        "Have some capital",
        "Systematic planning",
        "Scale management",
        "Asset allocation stage"
      ],
      touch: "Scale is not just a number, but your operational radius.",
      required: true
    },
    {
      id: 7,
      type: "single_choice",
      title: "How long have you been exposed to the investment market?",
      options: [
        "Less than 1 year",
        "1-3 years",
        "3-5 years",
        "More than 5 years"
      ],
      touch: "The longer the time, the more you can see what detours you've taken.",
      required: true
    },
    {
      id: 8,
      type: "single_choice",
      title: "How often do you usually check your investments or market conditions?",
      options: [
        "Multiple times a day",
        "Once a day",
        "A few times a week",
        "Occasionally"
      ],
      touch: "Check frequency is how you deal with uncertainty.",
      required: true
    },
    {
      id: 9,
      type: "single_choice",
      title: "Compared to yourself three years ago, which change are you closer to?",
      options: [
        "Mentality has obviously matured",
        "Technical progress, but emotions haven't changed",
        "Become more anxious",
        "More laid-back / giving up",
        "Can't say"
      ],
      touch: "Investment growth is first mental growth.",
      required: true
    },
    {
      id: 10,
      type: "multiple_choice",
      title: "When you hesitate whether to operate, what are the real obstacles that most easily block you?",
      options: [
        "Afraid of losses → dare not act",
        "Afraid of missing out → impulsively chase highs",
        "Too much information → unable to judge",
        "Don't know timing → keep procrastinating",
        "Lost before → mindset distorted",
        "No confidence → follow the crowd"
      ],
      touch: "Where you get stuck is your investment blind spot.",
      required: true
    },
    {
      id: 11,
      type: "multiple_choice",
      title: "What information sources do you mainly rely on for decision-making?",
      options: [
        "Social media opinions",
        "KOL / Streamers",
        "Your own systematic research",
        "Friend recommendations",
        "Institutional research reports",
        "AI / Smart tools"
      ],
      alwaysShowInput: true,
      inputPlaceholder: "Specific accounts or websites you follow...",
      inputNote: "We will match learning resources based on your profile to see if it's currently optimal. Please note: we only provide analysis, without specific investment advice.",
      touch: "What you believe determines how you see the world.",
      required: true
    },
    {
      id: 12,
      type: "single_choice",
      title: "What is the maximum short-term drawdown you can accept so you can still sleep?",
      options: [
        "5%",
        "10%",
        "20%",
        "30% or more"
      ],
      touch: "Drawdown threshold is your psychological safety boundary.",
      required: true
    },
    {
      id: 13,
      type: "multiple_choice",
      title: "What asset types do you currently actually hold?",
      options: [
        "Cash",
        "Stocks / ETF",
        "Funds",
        "Crypto assets",
        "Bonds / Fixed income",
        "Other"
      ],
      allowOtherText: true,
      touch: "Holdings are more honest than words.",
      required: true
    },
    {
      id: 14,
      type: "ranking",
      title: "When the following values cannot be combined, please rank them in order of your real trade-offs",
      options: [
        "Returns",
        "Risk control",
        "Liquidity",
        "Learning and growth",
        "Wealth stability"
      ],
      touch: "Every ranking is a dialogue with your inner values.",
      required: true
    },
    {
      id: 15,
      type: "single_choice",
      title: "Which is closer to your main source of income?",
      options: [
        "Salary",
        "Entrepreneurship / Freelance",
        "Investment returns",
        "Family support",
        "Other"
      ],
      touch: "Income structure determines the thickness of your safety cushion.",
      required: true
    },
    {
      id: 16,
      type: "single_choice",
      title: "What is closer to your ideal investment rhythm?",
      options: [
        "Steady upward",
        "Acceptable volatility",
        "Willing to bear larger volatility",
        "Hot spot in and out type"
      ],
      touch: "Investment rhythm often reflects life rhythm.",
      required: true
    },
    {
      id: 17,
      type: "single_choice",
      title: "How much time are you willing to continuously invest in investing?",
      options: [
        "More than 1 hour per day",
        "10-30 minutes per day",
        "1 hour per week",
        "The less the better"
      ],
      touch: "Time investment is your betting ratio on the future.",
      required: true
    },
    {
      id: 18,
      type: "single_choice",
      title: "What is your attitude towards smart investment / automation tools?",
      options: [
        "Very willing to use",
        "Willing to try",
        "Not very willing",
        "Won't use"
      ],
      touch: "Are you willing to give some control to the system?",
      required: true
    },
    {
      id: 19,
      type: "multiple_choice",
      title: "What kind of investment support do you most hope to get?",
      options: [
        "Clear buy/sell references",
        "Systematic method framework",
        "Asset allocation logic",
        "Emotional management",
        "Hot spot tracking",
        "Investor community"
      ],
      touch: "The support you crave is exactly the barrier you want to cross.",
      required: true
    },
    {
      id: 20,
      type: "single_choice",
      title: "What are you most dissatisfied with in your current investment experience?",
      options: [
        "Information too messy",
        "Content hard to understand",
        "No basis for decisions",
        "Tools too complex",
        "Unstable returns",
        "Lack of growth guidance"
      ],
      touch: "The most real pain points often point to your next breakthrough.",
      required: true
    },
    {
      id: 21,
      type: "open_text",
      title: "If I could only ask you one thing: What is the 'stuck point' you most want to solve in investing right now?",
      placeholder: "e.g., don't know how to buy/sell, mentality collapses easily, always follow the crowd, no time to learn, too little capital, etc.",
      touch: "The problem you're willing to write down seriously usually has been fermenting in your heart for a long time.",
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
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];
