// ✅ Required imports for App Router API
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Predefined list (Note: This is temporary in-memory storage, consider using a database)
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

  // Validate if the category is provided
  if (!category) {
    return NextResponse.json(
      { message: 'Category is required' },
      { status: 400 }
    )
  }

  // Check if category already exists
  if (predefinedCategories.includes(category)) {
    return NextResponse.json(
      { message: 'Category already exists' },
      { status: 400 }
    )
  }

  // Add the new category to the list
  predefinedCategories.push(category)

  // Return the newly added category with a success status
  return NextResponse.json({ category }, { status: 201 })
}
