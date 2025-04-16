'use client'; // ✅ Add this line

import React from "react";
import BudgetComparisonChart from "./BudgetComparisonChart";
import BudgetForm from "./BudgetForm";

const Dashboard: React.FC = () => {
  const handleSubmitBudget = async (budget: { category: string; amount: number; month: string }) => {
    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budget),
    });

    if (!res.ok) {
      console.error("Error submitting budget");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <BudgetForm onSubmit={handleSubmitBudget} />
      <BudgetComparisonChart />
    </div>
  );
};

export default Dashboard;
