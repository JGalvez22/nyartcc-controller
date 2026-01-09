'use client'

import { useState, useEffect } from 'react'
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout'
import type { Layout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Settings, Maximize2 } from 'lucide-react'

import ChartFoxWidget from './components/ChartFoxWidget'
import VatsimRadarWidget from './components/VatsimRadarWidget'
import SopLinksWidget from './components/SopLinksWidget'
import AtisListWidget from './components/AtisListWidget'
import ActiveControllersWidget from './components/ActiveControllersWidget'
import FrequencyReferenceWidget from './components/FrequencyReferenceWidget'

export default function ControllerDashboard() {
  const [isLocked, setIsLocked] = useState(true)
  const [width, setWidth] = useState(1200)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const defaultLayout: Layout[] = [
    { i: 'radar', x: 0, y: 0, w: 8, h: 12, minW: 4, minH: 8 },
    { i: 'charts', x: 8, y: 0, w: 4, h: 12, minW: 3, minH: 8 },
    { i: 'atis', x: 0, y: 12, w: 4, h: 10, minW: 3, minH: 6 },
    { i: 'controllers', x: 4, y: 12, w: 4, h: 10, minW: 3, minH: 6 },
    { i: 'frequencies', x: 8, y: 12, w: 4, h: 10, minW: 3, minH: 6 },
    { i: 'sop', x: 0, y: 22, w: 12, h: 6, minW: 4, minH: 4 },
  ]

  const [layouts, setLayouts] = useState<{ lg: Layout[] }>({
    lg: defaultLayout
  })

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: { lg: Layout[] }) => {
    setLayouts(allLayouts)
    if (typeof window !== 'undefined') {
      localStorage.setItem('controllerDashboardLayout', JSON.stringify(allLayouts))
    }
  }

  const resetLayout = () => {
    setLayouts({ lg: defaultLayout })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('controllerDashboardLayout')
    }
  }

  return (
    <div className="min-h-screen bg-aviation-navy">
      <header className="bg-aviation-blue border-b border-aviation-light/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-aviation-accent p-2 rounded-lg">
              <Maximize2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">NYARTCC Controller Dashboard</h1>
              <p className="text-gray-400 text-sm">Quick Reference & Tools</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={() => setIsLocked(!isLocked)} className={`${isLocked ? 'btn-secondary' : 'btn-primary'} flex items-center gap-2`}>
              <Settings className="w-4 h-4" />
              {isLocked ? 'Unlock Layout' : 'Lock Layout'}
            </button>
            {!isLocked && (
              <button onClick={resetLayout} className="btn-secondary">Reset Layout</button>
            )}
          </div>
        </div>
      </header>

      <div className="p-4">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          width={width}
          isDraggable={!isLocked}
          isResizable={!isLocked}
          onLayoutChange={handleLayoutChange}
          draggableHandle=".drag-handle"
        >
          <div key="radar"><VatsimRadarWidget isDraggable={!isLocked} /></div>
          <div key="charts"><ChartFoxWidget isDraggable={!isLocked} /></div>
          <div key="atis"><AtisListWidget isDraggable={!isLocked} /></div>
          <div key="controllers"><ActiveControllersWidget isDraggable={!isLocked} /></div>
          <div key="frequencies"><FrequencyReferenceWidget isDraggable={!isLocked} /></div>
          <div key="sop"><SopLinksWidget isDraggable={!isLocked} /></div>
        </ResponsiveGridLayout>
      </div>
    </div>
  )
}