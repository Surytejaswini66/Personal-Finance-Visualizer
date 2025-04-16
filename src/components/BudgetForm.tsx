"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface BudgetFormProps {
  onSubmit: (data: { category: string; amount: number; month: string }) => void;
}

const BudgetFormSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  month: z.string().min(1, "Month is required"),
});

type BudgetFormData = z.infer<typeof BudgetFormSchema>;

const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(BudgetFormSchema),
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        setError("Error fetching categories");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onFormSubmit = async (data: BudgetFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <div>
        <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
          Category
        </label>
        <select
          id="category"
          {...register("category")}
          disabled={loading}
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

      <div>
        <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          {...register("amount", { valueAsNumber: true })}
          placeholder="Enter amount"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
      </div>

      <div>
        <label htmlFor="month" className="block text-gray-700 font-medium mb-2">
          Month
        </label>
        <input
          id="month"
          type="text"
          {...register("month")}
          placeholder="Enter month (e.g. April 2025)"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.month && <p className="text-red-500 text-sm mt-1">{errors.month.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Budget"}
      </button>
    </form>
  );
};

export default BudgetForm;
