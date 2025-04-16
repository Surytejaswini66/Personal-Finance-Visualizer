"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";

interface Budget {
  category: string;
  budget: number;
  actual: number;
}

const BudgetComparisonChart: React.FC = () => {
  const [budgetData, setBudgetData] = useState<Budget[]>([]);
  const [error, setError] = useState<string | null>(null); // Error state to handle fetch errors

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const res = await fetch("/api/budgets");
        if (!res.ok) {
          throw new Error("Failed to fetch budget data");
        }
        const data = await res.json();
        
        // Simple validation to ensure the data has the right structure
        const isValidData = data.every(
          (item: any) =>
            typeof item.category === "string" &&
            typeof item.budget === "number" &&
            typeof item.actual === "number"
        );

        if (!isValidData) {
          throw new Error("Invalid data format");
        }

        setBudgetData(data);
      } catch (error: any) {
        setError(error.message); // Set error message if fetch or data validation fails
        console.error("Error fetching budget data:", error);
      }
    };

    fetchBudgetData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Display error message if something goes wrong
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={budgetData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#8884d8" />
        <Line type="monotone" dataKey="actual" stroke="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetComparisonChart;
