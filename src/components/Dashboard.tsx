'use client';

import React, { useState } from 'react';
import BudgetComparisonChart from './BudgetComparisonChart';
import BudgetForm from './BudgetForm';
import TransactionForm, { TransactionFormData } from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

const handleTransactionSubmit = async (data: TransactionFormData) => {
  try {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Transaction added successfully');
      alert('Transaction added successfully!');
    } else {
      console.log('Error adding transaction');
      alert('Failed to add transaction. Please try again!');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while adding the transaction.');
  }
};

const handleBudgetSubmit = async (data: { category: string; amount: number; month: string }) => {
  try {
    const res = await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log('Budget submitted successfully');
      alert('Budget submitted successfully!');
    } else {
      console.error('Error submitting budget');
      alert('Failed to submit budget. Please try again!');
    }
  } catch (error) {
    console.error('An error occurred while submitting the budget:', error);
    alert('An error occurred while submitting the budget.');
  }
};

const Dashboard: React.FC = () => {
  const [modalState, setModalState] = useState<'none' | 'transaction' | 'budget'>('none');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 transition-all duration-500 ease-in-out">
      {modalState !== 'none' && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-30 transition duration-300"></div>
      )}

      <div className={`relative z-10 max-w-7xl mx-auto transition-all duration-300 ${modalState !== 'none' ? 'blur-sm scale-[0.98]' : ''}`}>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-12 text-center drop-shadow-lg">
          📊 Budget Dashboard
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <button
            onClick={() => setModalState('transaction')}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
          >
            ➕ Add Transaction
          </button>
          <button
            onClick={() => setModalState('budget')}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
          >
            ➕ Add Budget
          </button>
        </div>

        {/* Transaction History */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">📜 Transaction History</h2>
          <TransactionList />
        </div>

        {/* Budget Comparison */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-pink-600">📈 Budget vs Expenses</h2>
          <BudgetComparisonChart />
        </div>
      </div>

      {/* Modal-style Form for Transaction */}
      {modalState === 'transaction' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl border-4 border-blue-400 animate-fade-in scale-95 sm:scale-100 transition-all duration-300 relative">
            <button
              onClick={() => setModalState('none')}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold transition"
            >
              ✖
            </button>
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">➕ Add Transaction</h2>
            <TransactionForm onSubmit={handleTransactionSubmit} />
          </div>
        </div>
      )}

      {/* Modal-style Form for Budget */}
      {modalState === 'budget' && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl border-4 border-green-400 animate-fade-in scale-95 sm:scale-100 transition-all duration-300 relative">
            <button
              onClick={() => setModalState('none')}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold transition"
            >
              ✖
            </button>
            <h2 className="text-3xl font-bold text-center text-green-600 mb-6">➕ Add Budget</h2>
            <BudgetForm onSubmit={handleBudgetSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
