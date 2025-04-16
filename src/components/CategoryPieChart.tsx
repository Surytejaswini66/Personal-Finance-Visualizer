import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Define the types for transaction and category data
interface Transaction {
  category: string;
  amount: number;
}

interface CategoryData {
  name: string;
  value: number;
}

const CategoryPieChart: React.FC = () => {
  // State to hold transactions and processed category data
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions'); // Replace with actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data: Transaction[] = await response.json();
        setTransactions(data); // Store transactions
        const aggregatedData = aggregateByCategory(data); // Process data by category
        setCategoryData(aggregatedData); // Set processed category data
      } catch (error) {
        setError('Error fetching transactions'); // Error handling
        console.error(error);
      }
    };

    fetchTransactions(); // Call the fetch function
  }, []); // Empty dependency array means it runs only once when the component mounts

  // Function to aggregate transaction data by category
  const aggregateByCategory = (data: Transaction[]): CategoryData[] => {
    const result: CategoryData[] = [];
    data.forEach((transaction) => {
      const existingCategory = result.find((item) => item.name === transaction.category);
      if (existingCategory) {
        existingCategory.value += transaction.amount; // Sum the amounts for existing categories
      } else {
        result.push({ name: transaction.category, value: transaction.amount }); // Add new category
      }
    });
    return result; // Return the aggregated category data
  };

  // Render error message if there's an error fetching data
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={categoryData} // Data to be displayed on the pie chart
        dataKey="value" // The value to determine the size of each slice
        nameKey="name" // The name of each category to display in the legend
        cx="50%" // Center of the pie chart on the x-axis
        cy="50%" // Center of the pie chart on the y-axis
        outerRadius={150} // Outer radius of the pie chart
        fill="#8884d8" // Default fill color for the pie chart
      >
        {/* Customize slice colors */}
        {categoryData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#ff7300' : '#00c49f'} />
        ))}
      </Pie>
      {/* Show the tooltip and legend */}
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategoryPieChart;
