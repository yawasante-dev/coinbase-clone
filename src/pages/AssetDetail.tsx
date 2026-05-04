import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Share2, ChevronDown } from "lucide-react";
import { getCryptoById } from "@/api/api";
import { CryptoAsset, formatPrice } from "@/data/cryptoData";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";

const timeframes = ["1H", "1D", "1W", "1M", "1Y", "All"];

const AssetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [asset, setAsset] = useState<CryptoAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAsset = async () => {
      if (!id) return;
      try {
        const res = await getCryptoById(id);
        setAsset(res.data);
      } catch (err: any) {
        setError("Asset not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-16 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (error || !asset) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 py-16 text-center">
        <p className="text-lg text-muted-foreground">Asset not found.</p>
        <Link to="/explore" className="mt-4 inline-flex text-sm text-primary hover:underline">
          ← Back to Explore
        </Link>
      </div>
    );
  }

  const isPositive = asset.change24h >= 0;
  const isNeutral = asset.change24h === 0;

  // Generate a simple sparkline from the price since backend doesn't store sparkline
  const generateSparkline = (price: number, change: number) => {
    const points = [];
    for (let i = 0; i < 8; i++) {
      const variance = (Math.random() - 0.5) * price * 0.02;
      points.push(price + variance);
    }
    points[7] = price; // last point is current price
    return points;
  };

  const chartData = generateSparkline(asset.price, asset.change24h);
  const min = Math.min(...chartData);
  const max = Math.max(...chartData);
  const range = max - min || 1;
  const width = 800;
  const height = 250;
  const stepX = width / (chartData.length - 1);
  const points = chartData
    .map((val, i) => `${i * stepX},${height - ((val - min) / range) * height * 0.75 - height * 0.125}`)
    .join(" ");

  const stats = [
    { label: "24h Change", value: `${asset.change24h > 0 ? "+" : ""}${asset.change24h.toFixed(2)}%` },
    { label: "Price change (1h)", value: `${(asset.change24h / 4).toFixed(2)}%` },
    { label: "24h Low / High", value: `${formatPrice(asset.price * 0.98)} / ${formatPrice(asset.price * 1.02)}` },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/explore" className="hover:text-primary">Explore</Link>
        <span>/</span>
        <span className="text-foreground">{asset.name} price</span>
      </div>

      <div className="mt-6 lg:grid lg:grid-cols-[1fr_360px] lg:gap-8">
        {/* Main content */}
        <div>
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img src={asset.image} alt={asset.name} className="h-10 w-10 rounded-full" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground">{asset.name} price</h1>
                  <span className="rounded bg-secondary px-2 py-0.5 text-sm font-medium text-muted-foreground">{asset.symbol}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary">
                <Star className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 text-muted-foreground hover:bg-secondary">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-[40px] font-bold leading-none text-foreground">{formatPrice(asset.price)}</span>
            <div className="mt-1 flex items-center gap-2">
              <span className={`text-sm font-medium ${isNeutral ? "text-muted-foreground" : isPositive ? "text-success" : "text-destructive"}`}>
                {isPositive ? "↗" : "↘"} {isPositive ? "+" : ""}{asset.change24h.toFixed(2)}%
              </span>
              <span className="text-sm text-muted-foreground">({selectedTimeframe})</span>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-6">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none" style={{ height: "250px" }}>
              <defs>
                <linearGradient id={`chartGrad-${asset._id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,${height} ${points} ${width},${height}`}
                fill={`url(#chartGrad-${asset._id})`}
              />
              <polyline
                points={points}
                fill="none"
                stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Timeframe buttons */}
            <div className="mt-4 flex gap-1 border-b border-border pb-4">
              {timeframes.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTimeframe(t)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    selectedTimeframe === t
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-foreground">{asset.name} market information</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="mt-8 border-t border-border pt-8">
            <h2 className="text-lg font-bold text-foreground">About {asset.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {asset.name} ({asset.symbol}) is one of the most popular and widely recognized cryptocurrencies in the market.
              It currently trades at {formatPrice(asset.price)} per coin.
              Over the last 24 hours, the price of {asset.name} has {isPositive ? "increased" : "decreased"} by {Math.abs(asset.change24h).toFixed(2)}%.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="mt-8 lg:mt-0">
          <Card className="rounded-2xl p-6">
            <div className="flex gap-2">
              <Button className="flex-1">Buy</Button>
              <Button variant="outline" className="flex-1">Sell</Button>
              <Button variant="outline" className="flex-1">Convert</Button>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-xs text-muted-foreground">Buy</label>
              <div className="flex items-center justify-between rounded-lg border border-input bg-background p-3">
                <input
                  type="text"
                  placeholder="$0"
                  className="w-full bg-transparent text-2xl font-bold text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  USD <ChevronDown className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-xs text-muted-foreground">Pay with</label>
              <div className="flex items-center justify-between rounded-lg border border-input bg-background p-3">
                <span className="text-sm text-muted-foreground">USD Balance — $0.00</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <Link
              to="/signup"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign up to trade
            </Link>
          </Card>

          {/* Price stats */}
          <Card className="mt-4 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-card-foreground">{asset.symbol} Price Statistics</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{asset.name} Price</span>
                <span className="font-medium text-card-foreground">{formatPrice(asset.price)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">24h Low / 24h High</span>
                <span className="font-medium text-card-foreground">
                  {formatPrice(asset.price * 0.98)} / {formatPrice(asset.price * 1.02)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">24h Change</span>
                <span className={`font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
                  {isPositive ? "+" : ""}{asset.change24h.toFixed(2)}%
                </span>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default AssetDetail;
