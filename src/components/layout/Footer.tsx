import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About", path: "#" },
      { label: "Careers", path: "#" },
      { label: "Affiliates", path: "#" },
      { label: "Blog", path: "#" },
      { label: "Press", path: "#" },
      { label: "Security", path: "#" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Crypto basics", path: "/learn" },
      { label: "Tips & tutorials", path: "/learn" },
      { label: "Market updates", path: "/learn" },
      { label: "What is Bitcoin?", path: "/learn" },
      { label: "What is Ethereum?", path: "/learn" },
      { label: "What is crypto?", path: "/learn" },
    ],
  },
  {
    title: "Individuals",
    links: [
      { label: "Buy & sell", path: "/explore" },
      { label: "Earn free crypto", path: "#" },
      { label: "Wallet", path: "#" },
      { label: "NFT", path: "#" },
      { label: "Prices", path: "/explore" },
      { label: "Taxes", path: "#" },
    ],
  },
  {
    title: "Businesses",
    links: [
      { label: "Institutional", path: "#" },
      { label: "Commerce", path: "#" },
      { label: "Exchange & Pro", path: "#" },
      { label: "Asset listing", path: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Cloud", path: "#" },
      { label: "Wallet SDK", path: "#" },
      { label: "Base", path: "#" },
      { label: "Documentation", path: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-border pt-8">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg width="112" height="28" viewBox="0 0 284 64" fill="none">
              <rect width="64" height="64" rx="32" fill="hsl(var(--primary))" />
              <path d="M32 44c-6.6 0-12-5.4-12-12s5.4-12 12-12c5.3 0 9.7 3.1 11.8 10h7.5c-2.3-10.8-11.5-17-19.3-17-11 0-19 8.5-19 19s8 19 19 19c7.8 0 17-6.2 19.3-17h-7.5c-2.1 6.9-6.5 10-11.8 10z" fill="white"/>
              <text x="76" y="42" fontFamily="DM Sans, sans-serif" fontSize="26" fontWeight="700" fill="currentColor">coinbase</text>
            </svg>
          </Link>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span>© 2026 Coinbase</span>
            <a href="#" className="hover:text-foreground">Legal & Privacy</a>
            <a href="#" className="hover:text-foreground">Cookie Policy</a>
            <a href="#" className="hover:text-foreground">Cookie Preferences</a>
            <a href="#" className="hover:text-foreground">Digital Asset Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
