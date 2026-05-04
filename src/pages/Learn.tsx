import { Link } from "react-router-dom";
import { learnArticles, cryptoBasicsArticles } from "@/data/cryptoData";

const whatIsTopics = [
  "Bitcoin", "Blockchain", "Cardano", "Crypto wallet", "DeFi", "Ethereum",
  "Fork", "Inflation", "Market cap", "NFT", "Private key", "Protocol",
  "Smart contract", "Token", "Volatility",
];

const Learn = () => {
  return (
    <div>
      {/* Hero */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">
          Crypto questions, answered
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
        </p>
      </section>

      <div className="mx-auto max-w-[1280px] px-6">
        {/* Featured + Popular */}
        <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Featured */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">Featured</h2>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={learnArticles[0].image}
                alt={learnArticles[0].title}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {learnArticles[0].category}
                </p>
                <h3 className="text-xl font-bold text-card-foreground">{learnArticles[0].title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{learnArticles[0].description}</p>
              </div>
            </div>
          </div>

          {/* Popular */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-foreground">Popular</h2>
            <div className="space-y-0 divide-y divide-border rounded-2xl border border-border bg-card">
              {learnArticles.slice(1).map((article) => (
                <div key={article.id} className="p-4 transition-colors hover:bg-secondary/50">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {article.category}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-card-foreground">{article.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Crypto basics */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-foreground">Crypto basics</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            New to crypto? Not for long — start with these guides and explainers
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cryptoBasicsArticles.map((article) => (
              <div
                key={article.id}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {article.category}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-card-foreground">{article.title}</h3>
                  {article.description && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{article.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Link to="#" className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline">
            See more crypto basics →
          </Link>
        </section>

        {/* What is... */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-foreground">What is...</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {whatIsTopics.map((topic) => (
              <span
                key={topic}
                className="cursor-pointer rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-secondary"
              >
                {topic}
              </span>
            ))}
          </div>
          <Link to="#" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
            See more →
          </Link>
        </section>

        {/* Categories */}
        <section className="mt-16 mb-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { title: "Crypto basics", desc: "See more →", emoji: "🪙" },
              { title: "Tips and tutorials", desc: "See more →", emoji: "📝" },
              { title: "Advanced trading", desc: "See more →", emoji: "📊" },
              { title: "Futures", desc: "See more →", emoji: "🔮" },
            ].map((cat) => (
              <div
                key={cat.title}
                className="cursor-pointer rounded-xl border border-border bg-card p-6 transition-colors hover:bg-secondary/50"
              >
                <span className="text-2xl">{cat.emoji}</span>
                <h3 className="mt-3 text-sm font-bold text-card-foreground">{cat.title}</h3>
                <p className="mt-1 text-xs text-primary">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Learn;
