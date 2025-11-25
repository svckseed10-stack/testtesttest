export default async function handler(req, res) {
  try {
    const url = "https://api.treasury.id/api/v1/antigrvty/gold/rate";

    const apiRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!apiRes.ok) {
      return res.status(500).json({ error: "API gagal diambil" });
    }

    const result = await apiRes.json();

    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(500).json({ error: "Server bermasalah" });
  }
}
