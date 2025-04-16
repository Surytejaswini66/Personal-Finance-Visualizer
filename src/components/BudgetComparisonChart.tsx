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

// Define the interface for the budget data structure
interface Budget {
  category: string;
  budget: number;
  actual: number;
}

const BudgetComparisonChart: React.FC = () => {
  // State to store the budget data fetched from the API
  const [budgetData, setBudgetData] = useState<Budget[]>([]);
  
  // State to handle errors during the fetch or data validation process
  const [error, setError] = useState<string | null>(null);

  // useEffect hook to fetch the budget data when the component mounts
  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const res = await fetch("/api/budgets"); // Fetch budget data from the API

        // Check if the response is successful, otherwise throw an error
        if (!res.ok) {
          throw new Error("Failed to fetch budget data");
        }

        const data = await res.json(); // Parse the JSON response

        // Simple validation to ensure the data has the correct format
        const isValidData = data.every(
          (item: any) =>
            typeof item.category === "string" &&
            typeof item.budget === "number" &&
            typeof item.actual === "number"
        );

        // If the data format is invalid, throw an error
        if (!isValidData) {
          throw new Error("Invalid data format");
        }

        // Set the valid budget data into state
        setBudgetData(data);
      } catch (error: any) {
        // If an error occurs, set the error state to display the message
        setError(error.message);
        console.error("Error fetching budget data:", error); // Log the error for debugging
      }
    };

    fetchBudgetData(); // Call the function to fetch budget data
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Display the error message if an error occurs
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the chart if no errors occurred
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={budgetData}>
        <CartesianGrid strokeDasharray="3 3" /> {/* Grid lines for the chart */}
        <XAxis dataKey="category" /> {/* X-axis to display the categories */}
        <YAxis /> {/* Y-axis to display the budget values */}
        <Tooltip /> {/* Tooltip to show values when hovering over the bars */}
        <Legend /> {/* Legend to show the color coding for budget vs actual */}
        
        {/* Bar chart for the budget values */}
        <Bar dataKey="budget" fill="#8884d8" />
        
        {/* Line chart for the actual values */}
        <Line type="monotone" dataKey="actual" stroke="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetComparisonChart;
