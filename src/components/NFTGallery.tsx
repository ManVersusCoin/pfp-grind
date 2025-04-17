import React from 'react'

export const NFTGallery = ({ nfts, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {nfts.map((nft, i) => (
        <div key={i} className="cursor-pointer" onClick={() => onSelect(nft)}>
          <img src={nft.media[0]?.gateway} alt={nft.title} className="rounded shadow" />
          <p className="text-center mt-2">{nft.title || 'NFT'}</p>
        </div>
      ))}
    </div>
  )
}
