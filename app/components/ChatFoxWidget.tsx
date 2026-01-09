'use client'

import { useState } from 'react'
import { Map, GripVertical } from 'lucide-react'

export default function ChartFoxWidget({ isDraggable }: { isDraggable: boolean }) {
  const airports = [
    'KJFK', 'KLGA', 'KEWR', 'KTEB', 'KHPN', 'KISP', 'KFRG', 
    'KPHL', 'KPNE', 'KTTN', 'KILG',
    'KMDT', 'KABE', 'KRDG', 'KBGM', 'KITH'
  ]

  const [selectedAirport, setSelectedAirport] = useState('KJFK')

  return (
    <div className="widget">
      <div className="widget-header">
        <h2 className="widget-title">
          {isDraggable && <GripVertical className="w-5 h-5 text-gray-500 drag-handle cursor-move" />}
          <Map className="w-5 h-5 text-aviation-accent" />
          Airport Charts
        </h2>
      </div>
      
      <div className="mb-4">
        <select value={selectedAirport} onChange={(e) => setSelectedAirport(e.target.value)} className="w-full bg-aviation-navy border border-aviation-light/30 rounded px-3 py-2 text-white focus:outline-none focus:border-aviation-accent">
          {airports.map((airport) => (
            <option key={airport} value={airport}>{airport}</option>
          ))}
        </select>
      </div>

      <div className="h-[calc(100%-120px)]">
        <iframe src={`https://chartfox.org/${selectedAirport}`} className="w-full h-full border-0 rounded" title="ChartFox" />
      </div>
    </div>
  )
}