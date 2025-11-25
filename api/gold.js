export default async function handler(req, res) {
  try {
    const url = "https://www.indogold.id/public/api/purities/5/products?lastPrice=1&orderBy=asc";
    const apiRes = await fetch(url);

    if (!apiRes.ok) {
      return res.status(500).json({ error: "API gagal diambil" });
    }

    const data = await apiRes.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server bermasalah" });
  }
}
