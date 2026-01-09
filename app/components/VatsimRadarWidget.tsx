import { Radar, GripVertical } from 'lucide-react'

export default function VatsimRadarWidget({ isDraggable }: { isDraggable: boolean }) {
  return (
    <div className="widget">
      <div className="widget-header">
        <h2 className="widget-title">
          {isDraggable && <GripVertical className="w-5 h-5 text-gray-500 drag-handle cursor-move" />}
          <Radar className="w-5 h-5 text-aviation-accent" />
          Live Traffic Radar
        </h2>
      </div>
      <div className="h-[calc(100%-60px)]">
        <iframe
          src="https://vatsim-radar.com/?center=-73.38227,41.04804&zoom=8.74"
          className="w-full h-full border-0 rounded"
          title="VATSIM Radar"
        />
      </div>
    </div>
  )
}