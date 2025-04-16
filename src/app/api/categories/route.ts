// ✅ Required imports for App Router API
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Predefined list
const predefinedCategories: string[] = [
  'Food',
  'Rent',
  'Utilities',
  'Transportation',
  'Entertainment',
]

// GET handler
export async function GET() {
  return NextResponse.json(predefinedCategories)
}

// POST handler
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { category } = body

  if (!category) {
    return NextResponse.json(
      { message: 'Category is required' },
      { status: 400 }
    )
  }

  predefinedCategories.push(category)
  return NextResponse.json({ category }, { status: 201 })
}
