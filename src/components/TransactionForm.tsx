import React from 'react'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Define the schema using zod for validation
const schema = z.object({
  amount: z
    .number()
    .positive()
    .int("Amount must be an integer") // Ensure the amount is a positive integer
    .refine((val) => !isNaN(val), { message: "Amount must be a number" }), // Validate that the amount is a number
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format", // Ensure the date is correctly formatted
    }),
  description: z
    .string()
    .min(1, "Description is required"), // Ensure the description is not empty
  category: z
    .string()
    .min(1, "Category is required"), // Ensure that the category is selected
});

// Define the type for form data based on the schema
export type TransactionFormData = z.infer<typeof schema>;

// Define the type for the onSubmit prop
interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void | Promise<void>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  // Destructure useForm hooks to handle form state and validation
  const { register, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({
    resolver: zodResolver(schema), // Use Zod schema for validation
  });

  // Handle the form submission by parsing the data
  const handleFormSubmit = (data: TransactionFormData) => {
    const parsedData = {
      ...data,
      amount: parseFloat(data.amount.toString()), // Convert the amount to a number if needed
    };
    onSubmit(parsedData); // Call the onSubmit handler with the parsed data
  };

  return (
    // Form submission handler is connected to the handleSubmit method from react-hook-form
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
      
      {/* Input for amount */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-semibold mb-2">Amount</label>
        <input
          {...register('amount', { valueAsNumber: true })} // Register amount input and ensure it is treated as a number
          id="amount"
          placeholder="Amount"
          type="number"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {/* Display error message if amount validation fails */}
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
      </div>

      {/* Input for date */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Date</label>
        <input
          {...register('date')} // Register date input
          id="date"
          type="date"
          placeholder="Date"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {/* Display error message if date validation fails */}
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
      </div>

      {/* Input for description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
        <input
          {...register('description')} // Register description input
          id="description"
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {/* Display error message if description validation fails */}
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      {/* Dropdown for category selection */}
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
        {/* Display error message if category validation fails */}
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
      </div>

      {/* Submit button for the form */}
      <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit</button>
    </form>
  );
};

export default TransactionForm;
