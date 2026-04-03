export const products = [
  {
    id: 'p1',
    name: {
      en: 'Arikalu (Kodo Millet)',
      te: 'అరికలు (Kodo Millet)',
    },
    description: {
      en: 'Rich in B vitamins, excellent for nervous system and purifies blood.',
      te: 'బి విటమిన్లు పుష్కలంగా ఉంటాయి, నాడీ వ్యవస్థకు అద్భుతమైనది మరియు రక్తాన్ని శుద్ధి చేస్తుంది.',
    },
    image: '/images/kodo_millet.png',
    sizes: [
      { size: '1/2 kg', price: 90, originalPrice: 120 },
      { size: '1 kg', price: 160, originalPrice: 220 },
      { size: '5 kg', price: 750, originalPrice: 1000 },
    ],
    badge: 'Best Seller',
  },
  {
    id: 'p2',
    name: {
      en: 'Udalu (Barnyard Millet)',
      te: 'ఊదలు (Barnyard Millet)',
    },
    description: {
      en: 'Great for liver and kidney health. Very low glycemic index.',
      te: 'కాలేయం మరియు మూత్రపిండాల ఆరోగ్యానికి మేలు చేస్తుంది. చాలా తక్కువ గ్లైసెమిక్ సూచిక.',
    },
    image: '/images/barnyard_millet.png',
    sizes: [
      { size: '1/2 kg', price: 95, originalPrice: 130 },
      { size: '1 kg', price: 170, originalPrice: 240 },
      { size: '5 kg', price: 800, originalPrice: 1100 },
    ],
    badge: 'Liver Detox',
  },
  {
    id: 'p3',
    name: {
      en: 'Korralu (Foxtail Millet)',
      te: 'కొర్రలు (Foxtail Millet)',
    },
    description: {
      en: 'Packed with proteins and aids in nervous system functions.',
      te: 'ప్రోటీన్లతో నిండి ఉంటుంది మరియు నాడీ వ్యవస్థ విధుల్లో సహాయపడుతుంది.',
    },
    image: '/images/foxtail_millet.png',
    sizes: [
      { size: '1/2 kg', price: 85, originalPrice: 115 },
      { size: '1 kg', price: 150, originalPrice: 210 },
      { size: '5 kg', price: 700, originalPrice: 950 },
    ],
  },
  {
    id: 'p4',
    name: {
      en: 'Andu Korralu (Browntop Millet)',
      te: 'అండు కొర్రలు (Browntop Millet)',
    },
    description: {
      en: 'Helps resolve gastrointestinal issues and balances doshas.',
      te: 'జీర్ణకోశ సమస్యలను పరిష్కరించడానికి సహాయపడుతుంది మరియు దోషాలను సమతుల్యం చేస్తుంది.',
    },
    image: '/images/browntop_millet.png',
    sizes: [
      { size: '1/2 kg', price: 120, originalPrice: 160 },
      { size: '1 kg', price: 220, originalPrice: 300 },
      { size: '5 kg', price: 1000, originalPrice: 1400 },
    ],
    badge: 'Premium',
  },
  {
    id: 'p5',
    name: {
      en: 'Samalu (Little Millet)',
      te: 'సామలు (Little Millet)',
    },
    description: {
      en: 'Excellent for hormonal balance and reproductive health.',
      te: 'హార్మోన్ల సమతుల్యత మరియు పునరుత్పత్తి ఆరోగ్యానికి అద్భుతమైనది.',
    },
    image: '/images/little_millet.png',
    sizes: [
      { size: '1/2 kg', price: 100, originalPrice: 140 },
      { size: '1 kg', price: 180, originalPrice: 260 },
      { size: '5 kg', price: 850, originalPrice: 1200 },
    ],
  }
];

export const getDiscountPercentage = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
