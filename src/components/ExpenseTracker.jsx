import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, deleteExpense } from "../store/expenseSlice";

const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(date).toLocaleDateString(),
    };

    dispatch(addExpense(newExpense));
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-10 mx-auto max-w-4xl">
      {/* Expense Tracker Form */}
      <div className="rounded-lg p-6 flex-1 bg-gradient-to-r from-[#f4e4ba] to-[#e0cda6] shadow-lg transition-transform duration-200 hover:scale-105">
        <h1 className="text-center font-bold text-2xl mb-4">Expense Tracker</h1>
        <p className="text-center text-xl font-semibold">
          Total Expenses: ₹{totalExpenses.toFixed(2)}
        </p>

        <form onSubmit={handleAddExpense} className="space-y-4">
          <div>
            <label className="block mb-1 text-lg">Amount</label>
            <input
              className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-lg">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="House Rent">House Rent</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-lg">Description</label>
            <input
              className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div>
            <label className="block mb-1 text-lg">Date</label>
            <input
              className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button className="bg-blue-600 w-full text-white h-10 rounded-md mb-5 hover:bg-blue-900 transition duration-200">
            Add Expense
          </button>
        </form>
      </div>

      {/* Expense Entries List */}
      {expenses.length > 0 && (
        <div className="rounded-lg border border-gray-300 p-6 flex-1 bg-gradient-to-r from-[#f4e4ba] to-[#e0cda6] shadow-lg transition-transform duration-200 hover:scale-105">
          <h2 className="font-bold text-lg text-center mb-4">Expenses</h2>
          <ul className="space-y-2">
            {expenses.map((expense, index) => (
              <li
                key={expense.id}
                className={`flex justify-between items-center p-4 rounded-md transition duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
                } hover:bg-[#e2e2e2]`}
              >
                <span className="text-gray-700">
                  {expense.date}: <strong>{expense.category}</strong> - ₹
                  {expense.amount}
                  {expense.description && ` (${expense.description})`}
                </span>
                <button
                  className="bg-red-600 text-white h-8 border-2 border-gray-300 rounded-md px-4 hover:bg-red-700 transition duration-200"
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
