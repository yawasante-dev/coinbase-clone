import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { loginUser } from "@/api/api";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-start justify-center bg-secondary/20 pt-16">
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="mb-8">
          <Link to="/">
            <svg width="28" height="28" viewBox="0 0 1024 1024" fill="none">
              <rect width="1024" height="1024" rx="512" fill="hsl(var(--primary))" />
              <path d="M512.3 692.5c-99.6 0-180.3-80.7-180.3-180.3s80.7-180.3 180.3-180.3c89.6 0 163.7 65.3 178 150.8H795c-15.6-148-139.7-261.4-282.7-261.4-157.4 0-290.9 127.3-290.9 290.9S354.9 803.1 512.3 803.1c143 0 267.1-113.4 282.7-261.4H690.3c-14.3 85.5-88.4 150.8-178 150.8z" fill="white"/>
            </svg>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-foreground">Sign in to Coinbase</h1>

        {/* ⚠️ Demo warning — required for deployment */}
        <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3">
          <p className="text-sm text-yellow-800">
            ⚠️ <span className="font-semibold">Demo app</span> — do not use your real password. This is a student project.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your email address"
          />

          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your password"
          />

          <Button type="submit" fullWidth className="rounded-lg bg-primary/60 hover:bg-primary" disabled={loading}>
            {loading ? "Signing in..." : "Continue"}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-3">
          <Button variant="outline" fullWidth className="rounded-lg gap-3">
            🔑 Sign in with Passkey
          </Button>
          <Button variant="outline" fullWidth className="rounded-lg gap-3">
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </Button>
          <Button variant="outline" fullWidth className="rounded-lg gap-3">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Sign in with Apple
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>

        <p className="mt-6 pb-12 text-center text-xs text-muted-foreground">
          Not your device? Use a private window. See our{" "}
          <a href="#" className="underline">Privacy Policy</a> for more info.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
