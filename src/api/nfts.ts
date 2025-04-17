import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { address, chain } = req.query;

  if (!address || !chain) {
    return res.status(400).json({ error: "Missing address or chain" });
  }

  try {
    const apiKey = process.env.ALCHEMY_API_KEY;
    const endpoint = `https://${chain}.g.alchemy.com/nft/v2/${apiKey}/getNFTs?owner=${address}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
