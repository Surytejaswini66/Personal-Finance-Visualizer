import { dbConnect } from '@/lib/mongodb';
import Transaction from '../../../models/transaction';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define a Zod schema for validating transaction data
const transactionSchema = z.object({
  amount: z.number().positive("Amount must be a positive number"),
  date: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }), // Ensure the date is valid
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

export async function POST(req: Request) {
  await dbConnect(); // 💥 this is critical

  try {
    // Validate incoming request data
    const body = await req.json();
    const validatedData = transactionSchema.parse(body); // This will throw if validation fails

    const transaction = new Transaction(validatedData);
    await transaction.save();
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors to the client
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }
    console.error('❌ Error saving transaction:', error);
    return NextResponse.json({ message: 'Error saving transaction' }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect(); // 💥 this is also critical

  try {
    const transactions = await Transaction.find();
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 });
  }
}
