import { Link } from "react-router-dom";
import { CryptoAsset, formatPrice } from "@/data/cryptoData";

interface CryptoRowProps {
  asset: CryptoAsset;
  index: number;
}

const CryptoRow = ({ asset, index }: CryptoRowProps) => {
  const isPositive = asset.change24h >= 0;
  const isNeutral = asset.change24h === 0;

  return (
    <Link
      to={`/asset/${asset._id}`}
      className="flex items-center border-b border-border px-4 py-4 transition-colors hover:bg-secondary/50 last:border-b-0"
    >
      {/* Star placeholder */}
      <div className="mr-3 hidden w-5 text-muted-foreground sm:block">☆</div>

      {/* Icon — backend uses "image" not "icon" */}
      <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center">
        <img src={asset.image} alt={asset.name} className="h-8 w-8 rounded-full" />
      </div>

      {/* Name */}
      <div className="mr-4 min-w-[100px] flex-1">
        <p className="text-sm font-semibold text-foreground">{asset.name}</p>
        <p className="text-xs text-muted-foreground">{asset.symbol}</p>
      </div>

      {/* Price */}
      <div className="mr-6 hidden w-28 text-right sm:block">
        <p className="text-sm text-foreground">{formatPrice(asset.price)}</p>
      </div>

      {/* Change */}
      <div className="mr-6 w-20 text-right">
        <p className={`text-sm ${isNeutral ? "text-muted-foreground" : isPositive ? "text-success" : "text-destructive"}`}>
          {isNeutral ? "" : isPositive ? "↗ " : "↘ "}{Math.abs(asset.change24h).toFixed(2)}%
        </p>
      </div>

      {/* Trade button */}
      <div className="hidden xl:block">
        <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
          Trade
        </span>
      </div>
    </Link>
  );
};

export default CryptoRow;
