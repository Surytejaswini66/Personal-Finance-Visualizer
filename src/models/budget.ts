import mongoose, { Document, Schema } from "mongoose";

// Interface defining the structure of the document in MongoDB
export interface IBudget extends Document {
  category: string; // Category of the budget (e.g., 'Food', 'Rent')
  amount: number; // Amount allocated for the category
  month: string; // Month for which the budget is allocated
}

// Schema definition for the Budget model
const BudgetSchema: Schema = new Schema(
  {
    category: { type: String, required: true }, // Define the 'category' field, must be a string and is required
    amount: { type: Number, required: true }, // Define the 'amount' field, must be a number and is required
    month: { type: String, required: true }, // Define the 'month' field, must be a string and is required
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields to track when the document is created and updated
);

// Check if the model is already defined, otherwise define it
const Budget = mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);

// Export the Budget model to be used in other parts of the application
export default Budget;
