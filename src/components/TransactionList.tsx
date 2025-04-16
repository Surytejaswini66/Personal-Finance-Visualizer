import React, { useEffect, useState } from 'react';

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: 0,
    category: '',
    date: ''
  });

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  const deleteTransaction = (id: string) => {
    fetch(`/api/transactions/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => {
        setTransactions((prev) => prev.filter((txn) => txn._id !== id));
      });
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTransaction) {
      const formattedDate = new Date(formData.date).toISOString().split('T')[0];
      const updatedTransaction = { ...formData, date: formattedDate };

      fetch(`/api/transactions/${editingTransaction._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTransaction),
      })
        .then((res) => res.json())
        .then(() => {
          setTransactions((prev) =>
            prev.map((txn) =>
              txn._id === editingTransaction._id ? { ...txn, ...updatedTransaction } : txn
            )
          );
          setEditingTransaction(null);
        })
        .catch((err) => console.error('Update failed:', err));
    }
  };

  return (
    <div className="relative">


      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition-all duration-300 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold text-gray-700">{transaction.description}</p>
              <p className="text-sm text-gray-500">💸 ${transaction.amount}</p>
              <p className="text-sm text-blue-500 capitalize">📂 {transaction.category}</p>
              <p className="text-sm text-gray-400">📅 {transaction.date}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(transaction)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => deleteTransaction(transaction._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingTransaction && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md mx-auto p-6 rounded-2xl shadow-2xl animate-fadeIn transition-all">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-800">✍️ Edit Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleFormChange}
                placeholder="Amount"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="rent">Rent</option>
                <option value="utilities">Utilities</option>
                <option value="transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
              </select>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingTransaction(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
