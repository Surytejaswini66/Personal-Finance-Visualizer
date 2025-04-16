import mongoose, { Document, Schema } from "mongoose";

export interface IBudget extends Document {
  category: string;
  amount: number;
  month: string;
}

const BudgetSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true },
  },
  { timestamps: true }
);

const Budget = mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);

export default Budget;
