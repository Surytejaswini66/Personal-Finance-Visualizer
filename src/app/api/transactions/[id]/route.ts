import { NextResponse } from 'next/server'
import Transaction from '../../../../models/transaction'
import { z } from 'zod'

// Define validation rules using Zod to ensure all transaction inputs are properly structured
const transactionSchema = z.object({
  amount: z.number().positive("Amount must be a positive number"), // Must be a positive number
  date: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }), // Ensures it's a valid date
  description: z.string().min(1, "Description is required"), // Description can’t be empty
  category: z.string().min(1, "Category is required"), // Category is mandatory
})

// PUT: Used for updating an existing transaction
export async function PUT(req: Request) {
  // Extracting transaction ID from the URL
  const id = req.url.split('/').pop()!

  try {
    const { amount, date, description, category } = await req.json()

    // Validating input against the schema to ensure all required fields are correct
    transactionSchema.parse({ amount, date, description, category })

    // Attempt to update the transaction in MongoDB and return the updated document
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description, category },
      { new: true } // Return the updated document
    )

    // If no transaction is found for the given ID, return a 404 response
    if (!updatedTransaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 })
    }

    // Return the updated transaction if everything is successful
    return NextResponse.json(updatedTransaction)
  } catch (error) {
    // If validation fails, return the validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', errors: error.errors },
        { status: 400 }
      )
    }

    // If there's an unexpected error, log it and return a generic error response
    console.error('Error updating transaction:', error)
    return NextResponse.json({ message: 'Error updating transaction' }, { status: 500 })
  }
}

// DELETE: Used to remove a transaction from the database
export async function DELETE(req: Request) {
  // Extracting transaction ID from the URL
  const id = req.url.split('/').pop()!

  try {
    // Attempt to delete the transaction from MongoDB
    const deletedTransaction = await Transaction.findByIdAndDelete(id)

    // If no transaction is found for the given ID, return a 404 response
    if (!deletedTransaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 })
    }

    // Return a success message after deletion
    return NextResponse.json({ message: 'Transaction deleted' })
  } catch (error) {
    // If there's an unexpected error, log it and return a generic error response
    console.error('Error deleting transaction:', error)
    return NextResponse.json({ message: 'Error deleting transaction' }, { status: 500 })
  }
}
