import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import { getAllCryptos } from "@/api/api";
import { CryptoAsset, formatPrice } from "@/data/cryptoData";

const Home = () => {
  const [email, setEmail] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");
  const [cryptos, setCryptos] = useState<CryptoAsset[]>([]);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllCryptos()
      .then((res) => setCryptos(res.data))
      .catch(() => {}); // silently fail — ticker just won't show
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="mx-auto max-w-[1280px] px-6 py-12 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 flex justify-center lg:order-1">
            <img
              src="/images/hero-phone.png"
              alt="Coinbase app showing portfolio"
              className="w-full max-w-[520px]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h1 className="text-[42px] font-bold leading-[1.05] tracking-[-0.02em] text-foreground md:text-[56px] lg:text-[64px]">
              The future of finance is here.
            </h1>
            <p className="mt-5 text-[18px] leading-relaxed text-muted-foreground">
              Trade crypto, stocks,² and more on a platform you can trust.
            </p>
            <p className="mt-3 text-[16px] text-foreground">
              Sign up and get up to $2,000 in crypto.¹
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="satoshi@nakamoto.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 py-3.5 text-[14px]"
              />
              <Button to="/signup" size="lg">
                Sign up
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-8 max-w-[700px] text-[11px] leading-relaxed text-muted-foreground">
          Securities offered by Coinbase Capital Markets (member SIPC, FINRA). Listed futures and swaps are offered via Coinbase Financial Markets ("CFM"), a NFA member firm. Crypto offered by Coinbase Inc.
        </p>
      </section>

      {/* Stocks */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div className="flex justify-center">
            <img src="/images/stocks.png" alt="Trade stocks around the clock" className="w-full max-w-[480px]" />
          </div>
          <div>
            <h2 className="text-[32px] font-bold leading-tight text-foreground md:text-[40px]">Trade stocks around the clock</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Get 24/5 access to thousands of stocks and pay zero commission. Now available to all U.S. traders.²
            </p>
            <Link to="/explore" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline">
              Start trading <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Derivatives */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="text-[32px] font-bold leading-tight text-foreground md:text-[40px]">Trade more with less</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Unlock leverage with futures and perpetuals trading.³
            </p>
            <Link to="/explore" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline">
              Trade now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="order-1 flex justify-center lg:order-2">
            <img src="/images/derivatives.png" alt="Trade more with less" className="w-full max-w-[480px]" />
          </div>
        </div>
      </section>

      {/* Explore tokens — ticker from backend */}
      <section className="border-t border-border bg-secondary/20 py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <h2 className="text-center text-[32px] font-bold leading-tight text-foreground md:text-[40px]">
            Explore millions of tokens and stocks, all in one place.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[16px] text-muted-foreground">
            One trusted account for trading everything—from stocks to Bitcoin.¹
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/explore">Get started</Button>
          </div>

          {/* Scrolling ticker — only renders when backend data is loaded */}
          {cryptos.length > 0 && (
            <div className="relative mt-12 overflow-hidden">
              <div className="flex animate-[scroll_30s_linear_infinite] gap-4" ref={tickerRef}>
                {[...cryptos, ...cryptos].map((asset, i) => {
                  const isPositive = asset.change24h >= 0;
                  const isNeutral = asset.change24h === 0;
                  return (
                    <Link
                      key={`${asset._id}-${i}`}
                      to={`/asset/${asset._id}`}
                      className="flex min-w-[220px] flex-shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-shadow hover:shadow-md"
                    >
                      <img src={asset.image} alt={asset.name} className="h-9 w-9 rounded-full" />
                      <div>
                        <p className="text-[14px] font-semibold text-card-foreground">{asset.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-card-foreground">{formatPrice(asset.price)}</span>
                          <span className={`text-[12px] font-medium ${isNeutral ? "text-muted-foreground" : isPositive ? "text-success" : "text-destructive"}`}>
                            {isPositive ? "↗" : "↘"} {Math.abs(asset.change24h).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Prediction Markets */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div className="flex justify-center">
            <img src="/images/predictions.png" alt="Prediction markets" className="w-full max-w-[480px]" />
          </div>
          <div>
            <h2 className="text-[32px] font-bold leading-tight text-foreground md:text-[40px]">Turn your insights into trades.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Trade your predictions on thousands of real world events across sports, politics, crypto, culture and more.³
            </p>
            <Link to="/explore" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline">
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced Trade */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="text-[32px] font-bold leading-tight text-foreground md:text-[40px]">
              Powerful tools, designed for the advanced trader.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience.
            </p>
            <Link to="/explore" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline">
              Start trading <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="order-1 flex justify-center lg:order-2">
            <img src="/images/advanced-trade.png" alt="Advanced Trade" className="w-full max-w-[480px]" />
          </div>
        </div>
      </section>

      {/* Coinbase One */}
      <section className="bg-coinbase-dark">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div className="flex justify-center">
            <img src="/images/coinbase-one.png" alt="Coinbase One" className="w-full max-w-[480px]" />
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">Coinbase One</p>
            <h2 className="text-[32px] font-bold leading-tight text-white md:text-[40px]">Zero trading fees, more rewards.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-gray-400">
              Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.
            </p>
            <Link to="/signup" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline">
              Claim free trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom cards */}
      <section className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden rounded-2xl">
            <img src="/images/explore-crypto.webp" alt="Explore crypto" className="h-56 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-[20px] font-bold text-card-foreground">Explore more crypto</h3>
              <p className="mt-2 text-[14px] text-muted-foreground">
                Browse real-time prices, charts, and daily movers for thousands of cryptocurrencies, all in one place.
              </p>
              <Link to="/explore" className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-primary hover:underline">
                Explore more crypto <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Card>
          <Card className="overflow-hidden rounded-2xl">
            <img src="/images/learn-basics.png" alt="Learn the basics" className="h-56 w-full object-cover" />
            <div className="p-6">
              <h3 className="text-[20px] font-bold text-card-foreground">Learn the basics</h3>
              <p className="mt-2 text-[14px] text-muted-foreground">
                Explore beginner guides, practical tutorials, and market updates on Bitcoin, Ethereum and more.
              </p>
              <Link to="/learn" className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-primary hover:underline">
                Learn the basics <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-coinbase-dark">
        <div className="mx-auto max-w-[1280px] px-6 py-20">
          <div className="flex flex-col items-center gap-10 md:flex-row md:justify-between">
            <div className="max-w-lg">
              <h2 className="text-[36px] font-bold leading-tight text-white md:text-[44px]">
                Take control of your money.
              </h2>
              <p className="mt-4 text-[16px] text-white">
                Start your portfolio today and <span className="font-bold">get up to $2,000 in crypto¹→</span>
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="satoshi@nakamoto.com"
                  value={ctaEmail}
                  onChange={(e) => setCtaEmail(e.target.value)}
                  className="flex-1 border-gray-600 bg-transparent py-3.5 text-[14px] text-white placeholder:text-gray-500"
                />
                <Button to="/signup" size="lg">
                  Sign up
                </Button>
              </div>
            </div>
            <img src="/images/crypto-circle.png" alt="Crypto currencies" className="h-52 w-52 md:h-72 md:w-72" />
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-[1280px] px-6 py-10">
        <div className="space-y-3 text-[10px] leading-relaxed text-muted-foreground">
          <p>¹ Valid for new users who make a cryptocurrency purchase of at least $50 or more on Coinbase. Limited while supplies last. <a href="#" className="underline">See Full Terms</a>.</p>
          <p>² All securities and investments are offered by Coinbase Capital Markets Corp, member FINRA/SIPC.</p>
          <p>³ Access to prediction markets initially limited to a subset of U.S. users. Futures and cleared swaps trading is offered by Coinbase Financial Markets, Inc.</p>
          <p>This webpage is for informational purposes only and does not constitute the provision of investment advice.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
