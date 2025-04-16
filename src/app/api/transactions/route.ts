import { dbConnect } from '@/lib/mongodb'
import Transaction from '../../../models/transaction'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Define a schema using Zod to ensure all required transaction fields are properly structured and valid
const transactionSchema = z.object({
  amount: z.number().positive("Amount must be a positive number"), // The amount must be greater than zero
  date: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }), // Checks that the date is valid
  description: z.string().min(1, "Description is required"), // Description is mandatory
  category: z.string().min(1, "Category is required"), // Category field can't be empty
})

// POST: Handles creating a new transaction
export async function POST(req: Request) {
  await dbConnect() // Connect to MongoDB before performing any DB operation

  try {
    // Parse and validate the incoming request body using the schema
    const body = await req.json()
    const validatedData = transactionSchema.parse(body)

    // Create and save the new transaction document in MongoDB
    const transaction = new Transaction(validatedData)
    await transaction.save()

    // Return the saved transaction with a 201 status
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    // If validation fails, return detailed validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      )
    }

    // For any unexpected server/database errors, log and return a generic error
    console.error('Error saving transaction:', error)
    return NextResponse.json({ message: 'Error saving transaction' }, { status: 500 })
  }
}

// GET: Fetches and returns all transactions
export async function GET() {
  await dbConnect() // Ensure database connection before querying

  try {
    // Retrieve all transactions from MongoDB
    const transactions = await Transaction.find()

    // Return the list of transactions
    return NextResponse.json(transactions)
  } catch (error) {
    // Log any unexpected errors and return a 500 response
    console.error('Error fetching transactions:', error)
    return NextResponse.json({ message: 'Error fetching transactions' }, { status: 500 })
  }
}
