// ✅ Required imports for handling API routes in the App Router
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ⚡️ Predefined categories for expenses
// This is a temporary in-memory list (for demo purposes). In production, these would be stored in a database.
const predefinedCategories: string[] = [
  'Food',
  'Rent',
  'Utilities',
  'Transportation',
  'Entertainment',
]

// 🟢 GET: Fetching all predefined categories
export async function GET() {
  // Just returning the current list as JSON
  return NextResponse.json(predefinedCategories)
}

// 🔵 POST: Add a new category to the list
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { category } = body

  // ✅ Validating if category is provided — simple input check to avoid empty entries
  if (!category) {
    return NextResponse.json(
      { message: 'Category is required' },
      { status: 400 }
    )
  }

  // 🚫 Preventing duplicates — making sure we don’t re-add an existing category
  if (predefinedCategories.includes(category)) {
    return NextResponse.json(
      { message: 'Category already exists' },
      { status: 400 }
    )
  }

  // ➕ Adding the new category to the list
  predefinedCategories.push(category)

  // 🆗 Returning the new category with a 201 status to indicate successful creation
  return NextResponse.json({ category }, { status: 201 })
}
