import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://data.vatsim.net/v3/vatsim-data.json', {
      next: { revalidate: 30 }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch VATSIM data')
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}