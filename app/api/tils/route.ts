import { NextResponse } from 'next/server'
import { getAllTils } from '@/lib/til'

export const revalidate = 3600

export async function GET() {
  const tils = await getAllTils()
  return NextResponse.json(tils)
}
