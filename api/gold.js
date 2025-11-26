import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});

// Fungsi fetch harga asli
async function fetchGoldPrice() {
  // Contoh API sumber harga
  const res = await fetch("https://sumber-harga-emas.example.com");
  const data = await res.json();
  return {
    buying_rate: parseFloat(data.buying_rate),
    selling_rate: parseFloat(data.selling_rate),
    updated_at: Date.now()
  };
}

export default async function handler(req, res) {
  try {
    const cacheKey = "gold_price";
    const cached = await redis.get(cacheKey);

    const now = Date.now();
    let price;

    if (cached && now - cached.updated_at < 1000) {
      // Jika cache masih fresh (<1 detik), gunakan cache
      price = cached;
    } else {
      // Ambil harga baru
      price = await fetchGoldPrice();
      await redis.set(cacheKey, price);
    }

    res.status(200).json(price);

  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
