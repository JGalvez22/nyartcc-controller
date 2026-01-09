'use client'

import { useEffect, useState } from 'react'
import { Radio, GripVertical } from 'lucide-react'

interface Atis {
  callsign: string
  frequency: string
  textAtis: string[]
}

export default function AtisListWidget({ isDraggable }: { isDraggable: boolean }) {
  const [atisList, setAtisList] = useState<Atis[]>([])
  const [loading, setLoading] = useState(true)

  const znyAirports = ['KJFK', 'KLGA', 'KEWR', 'KTEB', 'KHPN', 'KISP', 'KFRG', 'KPHL', 'KPNE', 'KTTN', 'KILG', 'KMDT', 'KABE', 'KRDG', 'KBGM', 'KITH', 'KELM']

  useEffect(() => {
    const fetchAtis = async () => {
      try {
        const response = await fetch('https://data.vatsim.net/v3/vatsim-data.json')
        const data = await response.json()
        
        const znyAtis = data.atis.filter((a: Atis) => {
          const callsign = a.callsign.toUpperCase()
          return znyAirports.some(airport => callsign.includes(airport) || callsign.includes(airport.replace('K', '')))
        })
        
        setAtisList(znyAtis)
      } catch (err) {
        console.error('Error fetching ATIS:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAtis()
    const interval = setInterval(fetchAtis, 30000)
    return () => clearInterval(interval)
  }, [])

  const extractInfoLetter = (atisText: string[]) => {
    const text = atisText.join(' ')
    const match = text.match(/INFO\s+([A-Z])/i) || text.match(/INFORMATION\s+([A-Z])/i)
    return match ? match[1] : '?'
  }

  return (
    <div className="widget">
      <div className="widget-header">
        <h2 className="widget-title">
          {isDraggable && <GripVertical className="w-5 h-5 text-gray-500 drag-handle cursor-move" />}
          <Radio className="w-5 h-5 text-aviation-accent" />
          Active ATIS
        </h2>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading ATIS...</p>
      ) : atisList.length === 0 ? (
        <p className="text-gray-500 text-sm">No active ATIS broadcasts</p>
      ) : (
        <div className="space-y-3">
          {atisList.map((atis, index) => (
            <div key={index} className="bg-aviation-navy rounded-lg p-3 border border-aviation-accent/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">{atis.callsign}</span>
                <div className="flex items-center gap-2">
                  <span className="bg-aviation-accent/20 text-aviation-accent font-bold px-2 py-1 rounded text-xs">
                    INFO {extractInfoLetter(atis.textAtis)}
                  </span>
                  <span className="text-aviation-accent font-mono text-xs">{atis.frequency}</span>
                </div>
              </div>
              <p className="text-gray-300 text-xs font-mono leading-relaxed line-clamp-3">
                {atis.textAtis.join(' ')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}