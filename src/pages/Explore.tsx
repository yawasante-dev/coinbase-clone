import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import CryptoRow from "@/components/crypto/CryptoRow";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import { getAllCryptos, getTopGainers, getNewListings } from "@/api/api";
import { CryptoAsset } from "@/data/cryptoData";

const marketStats = [
  { label: "Total market cap", value: "$2.26T", change: "0.30%", down: true },
  { label: "Trade volume", value: "$115.65B", change: "38.86%", down: true },
  { label: "Buy-sell ratio", value: "$0.78", change: "4.53%", down: true },
  { label: "BTC dominance", value: "60.09%", change: "0.33%", down: true },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [cryptos, setCryptos] = useState<CryptoAsset[]>([]);
  const [gainers, setGainers] = useState<CryptoAsset[]>([]);
  const [newListings, setNewListings] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allRes, gainersRes, newRes] = await Promise.all([
          getAllCryptos(),
          getTopGainers(),
          getNewListings(),
        ]);
        setCryptos(allRes.data);
        setGainers(gainersRes.data);
        setNewListings(newRes.data);
      } catch (err: any) {
        setError("Failed to load crypto data. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = cryptos.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-8">
      <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-8">
        {/* Main content */}
        <div>
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Explore crypto</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Coinbase 50 Index is down <span className="text-destructive">↘ 0.79%</span> (24hrs)
              </p>
            </div>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for an asset"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-full py-3 pl-10 pr-4"
              />
            </div>
          </div>

          {/* Market Stats */}
          <section className="mt-8 border-t border-border pt-8">
            <h2 className="text-xl font-bold text-foreground">Market stats</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The overall crypto market is growing this week. As of today, the total crypto market capitalization is 2.26 trillion, representing a 4.67% increase from last week.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {marketStats.map((stat) => (
                <Card key={stat.label} className="p-4">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-card-foreground">{stat.value}</span>
                    <span className="text-xs text-destructive">↘ {stat.change}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Price table */}
          <section className="mt-8 border-t border-border pt-8">
            <div className="flex items-baseline gap-2">
              <h2 className="text-xl font-bold text-foreground">Crypto market prices</h2>
              <span className="text-sm text-muted-foreground">{cryptos.length} assets</span>
            </div>

            {/* Filters */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["All assets", "1D", "USD", "10 rows"].map((f) => (
                <button
                  key={f}
                  className="flex items-center gap-1 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                >
                  {f} <span className="text-muted-foreground">▾</span>
                </button>
              ))}
            </div>

            {/* Table header */}
            <div className="mt-4 flex items-center border-b border-border px-4 py-2 text-xs font-medium text-muted-foreground">
              <div className="mr-3 hidden w-5 sm:block" />
              <div className="mr-3 w-8" />
              <div className="mr-4 min-w-[100px] flex-1">Asset</div>
              <div className="mr-6 hidden w-28 text-right sm:block">Market price</div>
              <div className="mr-6 w-20 text-right">Change</div>
              <div className="hidden w-16 xl:block">Actions</div>
            </div>

            {/* Rows */}
            <div className="overflow-hidden rounded-b-xl border-x border-b border-border bg-card">
              {loading && (
                <div className="px-4 py-12 text-center text-muted-foreground">Loading...</div>
              )}
              {error && (
                <div className="px-4 py-12 text-center text-destructive">{error}</div>
              )}
              {!loading && !error && filtered.length > 0 &&
                filtered.map((asset, i) => (
                  <CryptoRow key={asset._id} asset={asset} index={i} />
                ))
              }
              {!loading && !error && filtered.length === 0 && (
                <div className="px-4 py-12 text-center text-muted-foreground">No assets found.</div>
              )}
            </div>
          </section>

          {/* CTA */}
          <Card className="mt-8 flex items-center justify-between p-6">
            <p className="text-sm text-foreground">Create a Coinbase account to trade crypto. It's quick, easy, and secure.</p>
            <Button to="/signup">
              Start Trading <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="mt-8 hidden lg:mt-0 lg:block">
          {/* Sign up promo */}
          <div className="rounded-2xl bg-coinbase-dark p-6">
            <p className="text-sm font-semibold text-white">
              Earn up to $2,000 when you buy $50 in crypto
            </p>
            <p className="mt-1 text-xs text-gray-400">Create your account today</p>
            <Link
              to="/signup"
              className="mt-4 inline-flex rounded-lg bg-background px-5 py-2 text-sm font-semibold text-foreground hover:bg-background/90"
            >
              Sign up
            </Link>
            <p className="mt-3 text-[10px] text-gray-500">
              Restrictions apply. <a href="#" className="underline">See full terms.</a>
            </p>
          </div>

          {/* Top movers from backend */}
          <div className="mt-6">
            <h3 className="font-bold text-foreground">Top movers</h3>
            <p className="mt-1 text-xs text-muted-foreground">24hr change</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {gainers.slice(0, 4).map((asset) => (
                <Link
                  key={asset._id}
                  to={`/asset/${asset._id}`}
                  className="rounded-xl border border-border bg-card p-3 hover:shadow-md"
                >
                  <img src={asset.image} alt={asset.name} className="mb-2 h-8 w-8 rounded-full" />
                  <p className="text-xs font-semibold text-card-foreground">{asset.symbol}</p>
                  <p className="text-xs text-success">↗ {asset.change24h.toFixed(2)}%</p>
                  <p className="text-xs text-muted-foreground">${asset.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* New listings from backend */}
          <div className="mt-6">
            <h3 className="font-bold text-foreground">New on Coinbase</h3>
            <div className="mt-3 space-y-3">
              {newListings.slice(0, 3).map((asset) => (
                <Link
                  key={asset._id}
                  to={`/asset/${asset._id}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:shadow-md"
                >
                  <img src={asset.image} alt={asset.name} className="h-8 w-8 rounded-full" />
                  <div>
                    <p className="text-xs font-semibold text-card-foreground">{asset.symbol}</p>
                    <p className="text-xs text-muted-foreground">{asset.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Explore;
