import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { NFTGallery } from "./components/NFTGallery";
import { OverlayEditor } from "./components/OverlayEditor";

export default function App() {
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("eth-mainnet");
  const [nfts, setNfts] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const fetchNFTs = async () => {
    if (!address) return;
    const res = await fetch(`/api/nfts?address=${address}&chain=${chain}`);
    const data = await res.json();
    setNfts(data.ownedNfts);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center">
          <Input
            placeholder="EVM Wallet Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={chain}
            onChange={(e) => setChain(e.target.value)}
          >
            <option value="eth-mainnet">Ethereum</option>
            <option value="polygon-mainnet">Polygon</option>
            <option value="optimism-mainnet">Optimism</option>
            <option value="arbitrum-mainnet">Arbitrum</option>
          </select>
          <Button onClick={fetchNFTs}>Fetch NFTs</Button>
        </CardContent>
      </Card>

      {nfts.length > 0 && !selectedNFT && (
        <NFTGallery nfts={nfts} onSelect={setSelectedNFT} />
      )}

      {selectedNFT && (
        <OverlayEditor nft={selectedNFT} onBack={() => setSelectedNFT(null)} />
      )}
    </div>
  );
}
