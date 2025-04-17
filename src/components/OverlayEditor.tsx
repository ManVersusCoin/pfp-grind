import React, { useRef } from 'react'
import html2canvas from 'html2canvas'

export const OverlayEditor = ({ nft, onBack }) => {
  const editorRef = useRef(null)

  const handleDownload = async () => {
    if (!editorRef.current) return
    const canvas = await html2canvas(editorRef.current)
    const link = document.createElement('a')
    link.download = 'nft_overlay.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  const handleCopy = async () => {
    if (!editorRef.current) return
    const canvas = await html2canvas(editorRef.current)
    canvas.toBlob((blob) => {
      navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob! }),
      ])
    })
  }

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-blue-500 underline">← Retour</button>
      <div ref={editorRef} className="relative inline-block">
        <img src={nft.media[0]?.gateway} alt="NFT" />
        <img
          src="/overlays/hat.png"
          className="absolute top-0 left-0 w-20 h-20 cursor-move"
          style={{ transform: 'rotate(15deg)' }}
        />
      </div>
      <div className="flex gap-4">
        <button onClick={handleDownload} className="bg-green-500 text-white px-4 py-2 rounded">Télécharger</button>
        <button onClick={handleCopy} className="bg-blue-500 text-white px-4 py-2 rounded">Copier</button>
      </div>
    </div>
  )
}
