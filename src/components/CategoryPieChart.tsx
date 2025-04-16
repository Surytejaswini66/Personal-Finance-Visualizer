import React, { useEffect, useState } from 'react'; 
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Transaction {
  category: string;
  amount: number;
}

interface CategoryData {
  name: string;
  value: number;
}

const CategoryPieChart: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        const aggregatedData = aggregateByCategory(data);
        setCategoryData(aggregatedData);
      });
  }, []);

  const aggregateByCategory = (data: Transaction[]): CategoryData[] => {
    const result: CategoryData[] = [];
    data.forEach((transaction) => {
      const existingCategory = result.find((item) => item.name === transaction.category);
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else {
        result.push({ name: transaction.category, value: transaction.amount });
      }
    });
    return result;
  };

  return (
    <PieChart width={400} height={400}>
      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
        {categoryData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#ff7300' : '#00c49f'} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategoryPieChart;
