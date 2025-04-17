export const config = {
    runtime: 'edge', // ou "nodejs" si tu préfères Serverless classique
  };
  
  export default async function handler(req: Request) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
    const chain = searchParams.get('chain') || 'eth-mainnet';
  
    const apiKey = process.env.VITE_ALCHEMY_API_KEY;
  
    if (!apiKey || !address) {
      return new Response(
        JSON.stringify({ error: 'Missing API key or address' }),
        { status: 400 }
      );
    }
  
    const baseURL = `https://${chain}.g.alchemy.com/v2/${apiKey}`;
    const endpoint = `${baseURL}/getNFTs?owner=${address}`;
  
    const alchemyRes = await fetch(endpoint);
    const data = await alchemyRes.json();
  
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  