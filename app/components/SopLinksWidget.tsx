import { BookOpen, ExternalLink, GripVertical } from 'lucide-react'

export default function SopLinksWidget({ isDraggable }: { isDraggable: boolean }) {
  const sopLinks = [
    { name: 'Major Facilities SOPs', url: 'https://wiki.nyartcc.org/index.php?title=Major' },
    { name: 'Minor Facilities SOPs', url: 'https://wiki.nyartcc.org/index.php?title=Minor' },
    { name: 'Letters of Agreement (LOAs)', url: 'https://wiki.nyartcc.org/index.php?title=LOA' },
  ]

  return (
    <div className="widget">
      <div className="widget-header">
        <h2 className="widget-title">
          {isDraggable && <GripVertical className="w-5 h-5 text-gray-500 drag-handle cursor-move" />}
          <BookOpen className="w-5 h-5 text-aviation-accent" />
          Standard Operating Procedures
        </h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-3">
        {sopLinks.map((link) => {
          return (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-aviation-navy hover:bg-aviation-light/20 rounded-lg p-4 transition-all border border-aviation-light/30 hover:border-aviation-accent group">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold text-sm">{link.name}</h3>
                <ExternalLink className="w-4 h-4 text-aviation-accent group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-gray-400 text-xs">Quick reference documentation</p>
            </a>
          )
        })}
      </div>
    </div>
  )
}