'use client'

import { useEffect, useState } from 'react'
import { Users, GripVertical } from 'lucide-react'

interface Controller {
  callsign: string
  name: string
  frequency: string
  rating: number
  logon_time: string
}

export default function ActiveControllersWidget({ isDraggable }: { isDraggable: boolean }) {
  const [controllers, setControllers] = useState<Controller[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchControllers = async () => {
      try {
        const response = await fetch('https://data.vatsim.net/v3/vatsim-data.json')
        const data = await response.json()
        
        const znyControllers = data.controllers.filter((c: Controller) => {
          const callsign = c.callsign.toUpperCase()
          return callsign.includes('ZNY') || callsign.includes('JFK') || callsign.includes('LGA') || 
                 callsign.includes('EWR') || callsign.includes('N90') || callsign.includes('PHL')
        })
        
        setControllers(znyControllers)
      } catch (err) {
        console.error('Error fetching controllers:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchControllers()
    const interval = setInterval(fetchControllers, 30000)
    return () => clearInterval(interval)
  }, [])

  const getTimeOnline = (logonTime: string) => {
    const start = new Date(logonTime)
    const now = new Date()
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60)
    const hours = Math.floor(diff / 60)
    const minutes = diff % 60
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  return (
    <div className="widget">
      <div className="widget-header">
        <h2 className="widget-title">
          {isDraggable && <GripVertical className="w-5 h-5 text-gray-500 drag-handle cursor-move" />}
          <Users className="w-5 h-5 text-aviation-accent" />
          Controllers Online ({controllers.length})
        </h2>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading...</p>
      ) : controllers.length === 0 ? (
        <p className="text-gray-500 text-sm">No controllers currently online</p>
      ) : (
        <div className="space-y-2">
          {controllers.map((controller, index) => (
            <div key={index} className="bg-aviation-navy rounded p-3 border border-aviation-light/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-semibold text-sm">{controller.callsign}</span>
                <span className="text-aviation-accent font-mono text-xs">{controller.frequency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">{controller.name}</span>
                <span className="text-gray-500 text-xs">{getTimeOnline(controller.logon_time)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}