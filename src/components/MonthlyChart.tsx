import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        const aggregatedData = aggregateByMonth(data);
        setMonthlyData(aggregatedData);
      });
  }, []);

  // Function to aggregate data by month
  const aggregateByMonth = (data: Transaction[]): MonthlyData[] => {
    const result: MonthlyData[] = [];

    // Loop through each transaction to aggregate by month
    data.forEach((transaction) => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
      const existingMonth = result.find((item) => item.month === month);

      if (existingMonth) {
        existingMonth.amount += transaction.amount;
      } else {
        result.push({ month, amount: transaction.amount });
      }
    });

    return result;
  };

  return (
    <BarChart width={500} height={300} data={monthlyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  );
};

export default MonthlyChart;
