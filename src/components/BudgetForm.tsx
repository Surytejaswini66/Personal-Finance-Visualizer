"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Interface for the BudgetForm props
interface BudgetFormProps {
  onSubmit: (data: { category: string; amount: number; month: string }) => void;
}

// Zod schema for validating the form data
const BudgetFormSchema = z.object({
  category: z.string().min(1, "Category is required"), // Ensure category is provided
  amount: z.number().positive("Amount must be greater than 0"), // Ensure amount is a positive number
  month: z.string().min(1, "Month is required"), // Ensure month is provided
});

// Infer the form data type from the schema
type BudgetFormData = z.infer<typeof BudgetFormSchema>;

const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit }) => {
  // useForm hook for form validation and submission handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(BudgetFormSchema), // Use Zod for form validation
  });

  // State to manage categories, loading, and errors
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch available categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories"); // Fetch categories from the API
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json(); // Parse the response data
        setCategories(data); // Set the fetched categories
      } catch (error) {
        setError("Error fetching categories"); // Handle any errors from the fetch
        console.error(error); // Log the error for debugging
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchCategories(); // Call the fetchCategories function
  }, []); // Run only once on component mount

  // Form submit handler
  const onFormSubmit = async (data: BudgetFormData) => {
    try {
      await onSubmit(data); // Call the onSubmit function passed as a prop
    } catch (error) {
      console.error("Error submitting form", error); // Log errors during form submission
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)} // Handle form submission with react-hook-form
      className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      {/* Category Selection */}
      <div>
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
          Category
        </label>
        <select
          id="category"
          {...register("category")} // Register the category input
          disabled={loading} // Disable if categories are loading
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {loading ? (
            <option value="" disabled>
              Loading categories...
            </option>
          ) : (
            <>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </>
          )}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Amount Input */}
      <div>
        <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          {...register("amount", { valueAsNumber: true })} // Register amount input with value as number
          placeholder="Enter amount"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
      </div>

      {/* Month Input */}
      <div>
        <label htmlFor="month" className="block text-gray-700 font-medium mb-2">
          Month
        </label>
        <input
          id="month"
          type="text"
          {...register("month")} // Register month input
          placeholder="Enter month (e.g. April 2025)"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.month && <p className="text-red-500 text-sm mt-1">{errors.month.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading} // Disable submit button while loading
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Budget"} {/* Show loading text or submit text */}
      </button>
    </form>
  );
};

export default BudgetForm;
