export async function GET(req) {
    const url = new URL(req.url)
    const address = url.searchParams.get('address')
    const chain = url.searchParams.get('chain') || 'eth-mainnet'
  
    const res = await fetch(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_API_KEY}/getNFTs/?owner=${address}`,
      { headers: { accept: 'application/json' } }
    )
  
    const data = await res.json()
    return new Response(JSON.stringify(data), { status: 200 })
  }
  