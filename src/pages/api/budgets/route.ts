import { NextResponse, NextRequest } from 'next/server';

interface Budget {
  category: string;
  amount: number;
  month: string;
}

// Type the budgets array for better safety
let budgets: Budget[] = [
  { category: 'Food', amount: 500, month: '2023-04' },
  { category: 'Rent', amount: 1000, month: '2023-04' }
];

// GET request to fetch all budgets
export async function GET() {
  return NextResponse.json(budgets);
}

// POST request to create a new budget
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming JSON request
    const { category, amount, month } = await request.json();

    // Validation checks for required fields
    if (!category || !amount || !month) {
      return NextResponse.json(
        { message: 'Category, amount, and month are required' },
        { status: 400 }
      );
    }

    // Validate that 'amount' is a positive number
    if (amount <= 0) {
      return NextResponse.json(
        { message: 'Amount must be a positive number' },
        { status: 400 }
      );
    }

    // Validate month format (example: YYYY-MM)
    const monthRegex = /^\d{4}-\d{2}$/;
    if (!monthRegex.test(month)) {
      return NextResponse.json(
        { message: 'Month must be in the format YYYY-MM' },
        { status: 400 }
      );
    }

    // Create new budget entry
    const newBudget: Budget = { category, amount, month };
    budgets.push(newBudget);

    // Return the newly created budget with status 201
    return NextResponse.json(newBudget, { status: 201 });
  } catch (error: unknown) {  // Explicitly type error as unknown
    // If error is of type 'Error', safely access its message
    if (error instanceof Error) {
      console.error('Error processing POST request:', error);  // Log the error for debugging
      return NextResponse.json(
        { message: 'Error processing request', error: error.message },
        { status: 500 }
      );
    }

    // Fallback in case the error is not of type 'Error'
    console.error('Unknown error occurred:', error);  // Log the error for debugging
    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
