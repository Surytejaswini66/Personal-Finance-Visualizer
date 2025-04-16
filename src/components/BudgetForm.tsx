"use client"; // Marking this file as a client component

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
  const { register, handleSubmit, formState: { errors } } = useForm<BudgetFormData>({
    resolver: zodResolver(BudgetFormSchema),
  });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const onFormSubmit = async (data: BudgetFormData) => {
    try {
      await onSubmit(data);  // Handle form submission
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="category">Category</label>
        <select id="category" {...register("category")}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p>{errors.category.message}</p>}
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        <input id="amount" type="number" {...register("amount")} />
        {errors.amount && <p>{errors.amount.message}</p>}
      </div>

      <div>
        <label htmlFor="month">Month</label>
        <input id="month" type="text" {...register("month")} />
        {errors.month && <p>{errors.month.message}</p>}
      </div>

      <button type="submit">Submit Budget</button>
    </form>
  );
};

export default BudgetForm;
