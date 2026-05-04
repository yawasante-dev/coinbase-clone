import { Link } from "react-router-dom";
import { CryptoAsset, formatPrice } from "@/data/cryptoData";

interface CryptoCardProps {
  asset: CryptoAsset;
}

const CryptoCard = ({ asset }: CryptoCardProps) => {
  const isPositive = asset.change24h >= 0;

  return (
    <Link
      to={`/asset/${asset.id}`}
      className="group rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:border-primary/20"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-xl">
          {asset.icon}
        </div>
        <div>
          <p className="font-semibold text-card-foreground">{asset.name}</p>
          <p className="text-xs text-muted-foreground">{asset.symbol}</p>
        </div>
      </div>
      <p className="text-xl font-bold text-card-foreground">{formatPrice(asset.price)}</p>
      <p className={`mt-1 text-sm font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
        {isPositive ? "↑" : "↓"} {isPositive ? "+" : ""}{asset.change24h.toFixed(2)}%
      </p>
    </Link>
  );
};

export default CryptoCard;
