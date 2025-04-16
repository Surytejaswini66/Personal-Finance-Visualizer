import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the structure of a transaction
interface Transaction {
  date: string;  // Assuming date is a string, you can adjust this type as needed (e.g., Date object)
  amount: number;
}

// Define the structure of the aggregated monthly data
interface MonthlyData {
  month: string;
  amount: number;
}

const MonthlyChart: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        const aggregatedData = aggregateByMonth(data);
        setMonthlyData(aggregatedData);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError("Failed to load data");
      });
  }, []);

  // Function to aggregate data by month
  const aggregateByMonth = (data: Transaction[]): MonthlyData[] => {
    const result: MonthlyData[] = [];

    // Loop through each transaction to aggregate by month
    data.forEach((transaction) => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear(); // Extract the year for better grouping

      const existingMonth = result.find((item) => item.month === `${month} ${year}`);

      if (existingMonth) {
        existingMonth.amount += transaction.amount;
      } else {
        result.push({ month: `${month} ${year}`, amount: transaction.amount });
      }
    });

    return result;
  };

  if (error) {
    return <div>{error}</div>;  // Display error if fetching fails
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyChart;
