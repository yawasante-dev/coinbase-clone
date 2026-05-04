// ─── Types ────────────────────────────────────────────────────────────────────
// This matches what the backend returns from MongoDB

export interface CryptoAsset {
  _id: string;       // MongoDB uses _id instead of id
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  image: string;     // backend field is "image" not "icon"
  createdAt: string;
}

// ─── Helper functions (kept as-is) ───────────────────────────────────────────

export function formatPrice(price: number): string {
  if (price >= 1) {
    return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

export function formatMarketCap(cap: number): string {
  if (cap >= 1e12) return `$${(cap / 1e12).toFixed(1)}T`;
  if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
  if (cap >= 1e6) return `$${(cap / 1e6).toFixed(1)}M`;
  return `$${cap.toLocaleString()}`;
}

// ─── Static content (not from backend) ───────────────────────────────────────

export const learnArticles = [
  {
    id: "dollar-cost-averaging",
    title: "When is the best time to invest in crypto?",
    description: "When prices are fluctuating, how do you know when to buy? Learn more about using dollar-cost averaging to weather price volatility.",
    category: "Video Tutorial",
    image: "/images/learn-featured.png",
  },
  {
    id: "what-is-cryptocurrency",
    title: "What is cryptocurrency?",
    category: "Beginner's Guide",
  },
  {
    id: "earn-crypto-rewards",
    title: "How to earn crypto rewards",
    category: "Getting Started",
  },
  {
    id: "add-crypto-wallet",
    title: "How to add crypto to your Coinbase Wallet",
    category: "Getting Started",
  },
  {
    id: "tax-forms",
    title: "Tax forms, explained: A guide to U.S. tax forms and crypto reports",
    category: "Your Crypto",
  },
  {
    id: "guide-to-dapps",
    title: "Beginner's guide to dapps",
    category: "Getting Started",
  },
  {
    id: "bitcoin-etf",
    title: "Everything you need to know about the first-ever U.S. Bitcoin ETF",
    category: "Market Update",
  },
];

export const cryptoBasicsArticles = [
  {
    id: "what-is-bitcoin",
    title: "What is Bitcoin?",
    description: "Bitcoin is the world's first widely adopted cryptocurrency — it allows for secure and seamless peer-to-peer transactions on the internet.",
    category: "Beginner's Guide",
    image: "https://images.ctfassets.net/q5ulk4bp65r7/lUIdMeDm9tf33LZNjPqz8/a44f28b20bd9819f573a96848eed08183a548052bb7.webp?w=768&fm=png",
  },
  {
    id: "defi-altcoins",
    title: "Guide to DeFi tokens and altcoins",
    description: "From Aave to Zcash, decide what to trade with our beginner's guide",
    category: "Beginner's Guide",
    image: "https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png",
  },
  {
    id: "what-is-ethereum",
    title: "What is Ethereum?",
    category: "Beginner's guide",
    image: "https://images.ctfassets.net/q5ulk4bp65r7/3thWklmvu2WmAHJh0k1AcC/51521feeef170d94a446fbec6f262912/what-is-ethereum.png?w=768&fm=png",
  },
  {
    id: "what-is-defi",
    title: "What is DeFi?",
    category: "Key term",
    image: "https://images.ctfassets.net/q5ulk4bp65r7/2lrWtXLcleZPbsnzZnEeLB/bbd5a35075619f07e083fce5fdbf15f9/Learn_Illustration_What_is_DeFi.jpg?w=768&fm=png",
  },
];
