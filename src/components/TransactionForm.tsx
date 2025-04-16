import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the schema using zod for validation
const schema = z.object({
  amount: z
    .number()
    .positive()
    .int("Amount must be an integer") // Ensure it is a positive integer
    .refine((val) => !isNaN(val), { message: "Amount must be a number" }),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }), // Validating that date is correctly formatted
  description: z
    .string()
    .min(1, "Description is required"), // Ensures description is not empty
  category: z
    .string()
    .min(1, "Category is required"), // Ensures category is selected
});

// Define the type for form data based on the schema
export type TransactionFormData = z.infer<typeof schema>;

// Define the type for the onSubmit prop
interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void | Promise<void>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({
    resolver: zodResolver(schema),
  });

  // Handle the form submission
  const handleFormSubmit = (data: TransactionFormData) => {
    const parsedData = {
      ...data,
      amount: parseFloat(data.amount.toString()), // Convert the amount to a number
    };
    onSubmit(parsedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">Amount</label>
        <input
          {...register('amount', { valueAsNumber: true })}
          id="amount"
          placeholder="Amount"
          type="number"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Date</label>
        <input
          {...register('date')}
          id="date"
          type="date"
          placeholder="Date"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
        <input
          {...register('description')}
          id="description"
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
        <select {...register('category')} id="category" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <option value="">Select Category</option>
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="utilities">Utilities</option>
          <option value="transportation">Transportation</option>
          <option value="entertainment">Entertainment</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
    </form>
  );
};

export default TransactionForm;
