import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Globe } from "lucide-react";
import { getProfile, logoutUser } from "@/api/api";

interface DropdownItem {
  label: string;
  desc?: string;
  path: string;
}

interface NavItem {
  label: string;
  path: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: "Cryptocurrencies",
    path: "/explore",
    dropdown: [
      { label: "Prices", desc: "See all crypto prices", path: "/explore" },
      { label: "Bitcoin", desc: "Explore BTC", path: "/asset/bitcoin" },
      { label: "Ethereum", desc: "Explore ETH", path: "/asset/ethereum" },
      { label: "Solana", desc: "Explore SOL", path: "/asset/solana" },
      { label: "XRP", desc: "Explore XRP", path: "/asset/xrp" },
    ],
  },
  {
    label: "Individuals",
    path: "#",
    dropdown: [
      { label: "Buy & sell", desc: "Buy and sell crypto", path: "/explore" },
      { label: "Earn", desc: "Earn crypto rewards", path: "#" },
      { label: "Wallet", desc: "Your keys, your crypto", path: "#" },
      { label: "Card", desc: "Spend crypto anywhere", path: "#" },
    ],
  },
  {
    label: "Businesses",
    path: "#",
    dropdown: [
      { label: "Commerce", desc: "Accept crypto payments", path: "#" },
      { label: "Exchange", desc: "Trade at scale", path: "#" },
      { label: "Asset Hub", desc: "List your asset", path: "#" },
    ],
  },
  {
    label: "Institutions",
    path: "#",
    dropdown: [
      { label: "Prime", desc: "Institutional trading", path: "#" },
      { label: "Custody", desc: "Secure storage", path: "#" },
      { label: "Analytics", desc: "Blockchain analytics", path: "#" },
    ],
  },
  {
    label: "Developers",
    path: "#",
    dropdown: [
      { label: "Cloud", desc: "Build on Coinbase", path: "#" },
      { label: "Wallet SDK", desc: "Integrate wallets", path: "#" },
      { label: "Base", desc: "Build on L2", path: "#" },
      { label: "Documentation", desc: "API reference", path: "#" },
    ],
  },
  {
    label: "Company",
    path: "#",
    dropdown: [
      { label: "About", desc: "Our mission", path: "#" },
      { label: "Careers", desc: "Join us", path: "#" },
      { label: "Blog", desc: "Latest news", path: "#" },
      { label: "Press", desc: "Media resources", path: "#" },
    ],
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
    
    // Check auth status
    const checkAuth = async () => {
      try {
        await getProfile();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* ⚠️ Disclaimer banner — required for deployment */}
      <div className="bg-yellow-400 py-2 text-center">
        <p className="text-sm font-medium text-yellow-900">
          ⚠️ This is a student project and not affiliated with Coinbase.
        </p>
      </div>

      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between px-6">
          {/* Logo + Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <svg width="28" height="28" viewBox="0 0 1024 1024" fill="none">
                <rect width="1024" height="1024" rx="512" fill="hsl(var(--primary))" />
                <path d="M512.3 692.5c-99.6 0-180.3-80.7-180.3-180.3s80.7-180.3 180.3-180.3c89.6 0 163.7 65.3 178 150.8H795c-15.6-148-139.7-261.4-282.7-261.4-157.4 0-290.9 127.3-290.9 290.9S354.9 803.1 512.3 803.1c143 0 267.1-113.4 282.7-261.4H690.3c-14.3 85.5-88.4 150.8-178 150.8z" fill="white"/>
              </svg>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center lg:flex">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.path}
                    className="flex items-center gap-0.5 px-3 py-2 text-[14px] font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>

                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full z-50 min-w-[240px] rounded-xl border border-border bg-card p-2 shadow-xl">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          className="flex flex-col rounded-lg px-4 py-3 transition-colors hover:bg-secondary"
                        >
                          <span className="text-sm font-medium text-card-foreground">{sub.label}</span>
                          {sub.desc && (
                            <span className="text-xs text-muted-foreground">{sub.desc}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <button className="hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary lg:inline-flex">
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button className="hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary lg:inline-flex">
              <Globe className="h-[18px] w-[18px]" />
            </button>
            {isLoggedIn ? (
              <>
                <Link
                  to="/add-crypto"
                  className="hidden rounded-full border border-border px-4 py-[7px] text-[14px] font-medium text-foreground transition-colors hover:bg-secondary lg:inline-flex"
                >
                  Add Crypto
                </Link>
                <Link
                  to="/profile"
                  className="ml-1 hidden rounded-full border border-border px-4 py-[7px] text-[14px] font-medium text-foreground transition-colors hover:bg-secondary lg:inline-flex"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-1 hidden rounded-full bg-destructive px-5 py-[7px] text-[14px] font-semibold text-destructive-foreground transition-colors hover:bg-destructive/90 lg:inline-flex"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="hidden rounded-full border border-border px-4 py-[7px] text-[14px] font-medium text-foreground transition-colors hover:bg-secondary lg:inline-flex"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="ml-1 rounded-full bg-primary px-5 py-[7px] text-[14px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 lg:inline-flex hidden"
                >
                  Sign up
                </Link>
              </>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="ml-1 inline-flex rounded-md p-2 text-muted-foreground lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto border-t border-border bg-background lg:hidden">
            <nav className="mx-auto max-w-[1280px] px-6 py-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-border py-3 last:border-b-0">
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="block text-[15px] font-medium text-foreground"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="mt-2 ml-4 space-y-2">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm text-muted-foreground hover:text-primary"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoggedIn ? (
                <>
                  <Link
                    to="/add-crypto"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 block text-[15px] font-medium text-muted-foreground"
                  >
                    Add Crypto
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 block text-[15px] font-medium text-muted-foreground"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="mt-4 block text-left text-[15px] font-medium text-destructive"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 block text-[15px] font-medium text-muted-foreground"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 block text-[15px] font-medium text-primary"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
