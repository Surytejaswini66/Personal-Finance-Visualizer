import { NextResponse } from 'next/server';
import Transaction from '../../../../models/transaction';
import { z } from 'zod';

// Define a Zod schema for validating transaction data
const transactionSchema = z.object({
  amount: z.number().positive("Amount must be a positive number"),
  date: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }), // Ensure the date is valid
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

export async function PUT(req: Request) {
  const id = req.url.split('/').pop()!;

  try {
    const { amount, date, description, category } = await req.json();

    // Validate the incoming data
    transactionSchema.parse({ amount, date, description, category }); // This will throw if validation fails

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description, category },
      { new: true }
    );

    if (!updatedTransaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation failed', errors: error.errors }, { status: 400 });
    }
    console.error('❌ Error updating transaction:', error);
    return NextResponse.json({ message: 'Error updating transaction' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const id = req.url.split('/').pop()!;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    console.error('❌ Error deleting transaction:', error);
    return NextResponse.json({ message: 'Error deleting transaction' }, { status: 500 });
  }
}
