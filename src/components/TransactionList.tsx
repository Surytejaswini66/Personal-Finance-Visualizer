import React, { useEffect, useState } from 'react';

// Define the type for a transaction object
interface Transaction {
  _id: string;
  description: string;
  amount: number;
  category: string;
}

const TransactionList = () => {
  // Define the state to hold transactions, using the Transaction type
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  // Define the deleteTransaction function with the id type as string (because _id is a string)
  const deleteTransaction = (id: string) => {
    fetch(`/api/transactions/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => setTransactions(transactions.filter((transaction) => transaction._id !== id)));
  };

  return (
    <div>
      {transactions.map((transaction) => (
        <div key={transaction._id}>
          <p>{transaction.description}</p>
          <p>{transaction.amount}</p>
          <p>{transaction.category}</p>
          <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
