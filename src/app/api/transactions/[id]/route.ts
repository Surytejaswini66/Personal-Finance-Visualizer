import { NextResponse } from 'next/server';
import Transaction from '../../../../models/transaction';

export async function PUT(req: Request) {
  const { id } = req.url.split('/').pop()!;
  const { amount, date, description, category } = await req.json();
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description, category },
      { new: true }
    );
    return NextResponse.json(updatedTransaction);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating transaction' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = req.url.split('/').pop()!;
  try {
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting transaction' }, { status: 500 });
  }
}
