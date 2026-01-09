'use client'

import { useState } from 'react'
import { Radio, GripVertical } from 'lucide-react'

export default function FrequencyReferenceWidget({ isDraggable }: { isDraggable: boolean }) {
  const facilities = [
    {
      name: 'N90 (New York TRACON)',
      frequencies: [
        { position: 'Approach', freq: '125.700, 120.800, 135.900' },
        { position: 'Departure', freq: '120.400, 134.550' },
      ]
    },
    {
      name: 'PHL (Philadelphia)',
      frequencies: [
        { position: 'Approach', freq: '128.400' },
        { position: 'Departure', freq: '124.350' },
      ]
    },
    {
      name: 'ZNY (New York Center)',
      frequencies: [
        { position: 'Various Sectors', freq: '118.850, 120.400, 124.100, 125.325' },
      ]
    }
  ]

  return (
    <div className="widget">
      <div className="widget-header">
        <h2 className="widget-title">
          {isDraggable && <GripVertical className="w-5 h-5 text-gray-500 drag-handle cursor-move" />}
          <Radio className="w-5 h-5 text-aviation-accent" />
          Frequency Reference
        </h2>
      </div>

      <div className="space-y-4">
        {facilities.map((facility, index) => (
          <div key={index} className="bg-aviation-navy rounded-lg p-3 border border-aviation-light/30">
            <h3 className="text-white font-semibold text-sm mb-2">{facility.name}</h3>
            <div className="space-y-1">
              {facility.frequencies.map((freq, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">{freq.position}:</span>
                  <span className="text-aviation-accent font-mono text-xs">{freq.freq}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}