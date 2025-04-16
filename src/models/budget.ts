import mongoose, { Document, Schema } from "mongoose";

// Interface defining the structure of the document in MongoDB
export interface IBudget extends Document {
  category: string;
  amount: number;
  month: string;
}

// Schema definition for the Budget model
const BudgetSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Check if the model is already defined, otherwise define it
const Budget = mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);

export default Budget;
