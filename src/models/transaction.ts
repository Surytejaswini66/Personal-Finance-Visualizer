import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

// Define the TypeScript interface for the Transaction
export interface ITransaction extends Document {
  amount: number;
  date: Date;
  description: string;
  category: string;
}

// Define a Zod schema for input validation
const transactionValidationSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  date: z.date(),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

// Mongoose schema for Transaction
const transactionSchema = new Schema<ITransaction>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

// Use the model or define it if not yet created
const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema);

// Function to validate data using Zod before saving to the database
const validateAndCreateTransaction = async (transactionData: any) => {
  try {
    // Validate data using Zod
    transactionValidationSchema.parse(transactionData);

    // If validation passes, create and save the transaction
    const newTransaction = new Transaction(transactionData);
    await newTransaction.save();
    console.log('Transaction saved successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    } else {
      console.error('Error saving transaction:', error);
    }
  }
};

export default Transaction;
export { validateAndCreateTransaction };
