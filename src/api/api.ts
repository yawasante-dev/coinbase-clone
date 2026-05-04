const BASE_URL = "http://localhost:5000";

// Helper: makes fetch calls with credentials (sends JWT cookie automatically)
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", // always send cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    // throw the backend's error message so we can show it in the UI
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const registerUser = (name: string, email: string, password: string) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

export const loginUser = (email: string, password: string) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const logoutUser = () =>
  apiFetch("/auth/logout", { method: "POST" });

// ─── User ─────────────────────────────────────────────────────────────────────

export const getProfile = () => apiFetch("/user/profile");

// ─── Crypto ───────────────────────────────────────────────────────────────────

export const getAllCryptos = () => apiFetch("/crypto");

export const getTopGainers = () => apiFetch("/crypto/gainers");

export const getNewListings = () => apiFetch("/crypto/new");

export const getCryptoById = (id: string) => apiFetch(`/crypto/${id}`);

export const addCrypto = (cryptoData: {
  name: string;
  symbol: string;
  price: number;
  image: string;
  change24h: number;
}) =>
  apiFetch("/crypto", {
    method: "POST",
    body: JSON.stringify(cryptoData),
  });
