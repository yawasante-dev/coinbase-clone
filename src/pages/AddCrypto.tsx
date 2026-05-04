import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { addCrypto } from "@/api/api";

const AddCrypto = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [change24h, setChange24h] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await addCrypto({
        name,
        symbol,
        price: Number(price),
        image,
        change24h: Number(change24h),
      });
      setSuccess("Cryptocurrency added successfully!");
      setTimeout(() => {
        navigate("/explore");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-start justify-center bg-secondary/20 pt-16">
      <div className="w-full max-w-lg px-4">
        <h1 className="text-3xl font-bold text-foreground">Add Cryptocurrency</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Fill out the details below to list a new asset on the platform.
        </p>

        {error && (
          <div className="mt-6 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-lg bg-green-500/10 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <Input
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Bitcoin"
          />

          <Input
            id="symbol"
            label="Symbol"
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
            placeholder="e.g. BTC"
          />

          <Input
            id="price"
            label="Price (USD)"
            type="number"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="e.g. 64000.00"
          />

          <Input
            id="image"
            label="Image URL"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            placeholder="https://..."
          />

          <Input
            id="change24h"
            label="24h Change (%)"
            type="number"
            step="any"
            value={change24h}
            onChange={(e) => setChange24h(e.target.value)}
            required
            placeholder="e.g. 2.5"
          />

          <div className="pt-4">
            <Button type="submit" fullWidth className="rounded-lg bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? "Adding..." : "Add Cryptocurrency"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCrypto;
