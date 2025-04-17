import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { address, chain } = req.query;

  if (!address || !chain) {
    return res.status(400).json({ error: "Missing address or chain" });
  }

  const apiKey = process.env.ALCHEMY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing Alchemy API key" });
  }

  const endpoint = `https://${chain}.g.alchemy.com/nft/v2/${apiKey}/getNFTs?owner=${address}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: `Alchemy error: ${response.status} - ${errorText}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err: any) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
