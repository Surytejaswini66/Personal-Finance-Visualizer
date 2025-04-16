import { NextResponse, NextRequest } from 'next/server';

let budgets = [
  { category: 'Food', amount: 500, month: '2023-04' },
  { category: 'Rent', amount: 1000, month: '2023-04' }
];

export async function GET() {
  return NextResponse.json(budgets);
}

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON request
    const { category, amount, month } = await request.json();

    if (!category || !amount || !month) {
      return NextResponse.json(
        { message: 'Category, amount, and month are required' },
        { status: 400 }
      );
    }

    // Create new budget entry
    const newBudget = { category, amount, month };
    budgets.push(newBudget);

    // Return the newly created budget
    return NextResponse.json(newBudget, { status: 201 });
  } catch (error: unknown) {  // Explicitly type error as unknown
    // If error is of type 'Error', safely access its message
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Error processing request', error: error.message },
        { status: 500 }
      );
    }

    // Fallback in case the error is not of type 'Error'
    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
