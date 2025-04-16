"use client";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart } from "recharts";

interface Budget {
  category: string;
  budget: number;
  actual: number; // Assume this is calculated or fetched along with budget data
}

const BudgetComparisonChart: React.FC = () => {
  const [budgetData, setBudgetData] = useState<Budget[]>([]);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const res = await fetch("/api/budgets");
        if (!res.ok) {
          throw new Error("Failed to fetch budget data");
        }
        const data = await res.json();
        setBudgetData(data);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      }
    };
  
    fetchBudgetData();
  }, []);
  

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
