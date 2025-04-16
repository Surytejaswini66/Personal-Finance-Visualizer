import { NextResponse } from 'next/server';
import Transaction from '../../../models/transaction';

export async function POST(req: Request) {
  const { amount, date, description, category } = await req.json();
  const transaction = new Transaction({ amount, date, description, category });
  try {
    await transaction.save();
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ message: 'Error saving transaction' }, { status: 500 });
  }
}
export async function GET() {
    try {
      const transactions = await Transaction.find();
      return NextResponse.json(transactions);
    } catch (error) {
      return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 });
    }
  }
  