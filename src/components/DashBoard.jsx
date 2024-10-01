import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { FaMoneyBillWave, FaClipboardList, FaPiggyBank } from "react-icons/fa";

const formatCurrency = (amount) => `₹${Number(amount).toFixed(2)}`;

const Dashboard = () => {
  const { incomeEntry } = useSelector((state) => state.income);
  const { expenses } = useSelector((state) => state.expenses);
  const { goals } = useSelector((state) => state.savingsGoals);

  const totalIncome = useMemo(
    () => incomeEntry.reduce((total, entry) => total + Number(entry.amount), 0),
    [incomeEntry]
  );

  const totalExpenses = useMemo(
    () =>
      expenses.reduce((total, expense) => total + Number(expense.amount), 0),
    [expenses]
  );

  const netIncome = useMemo(
    () => totalIncome - totalExpenses,
    [totalIncome, totalExpenses]
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
        Finance Tracker Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="p-6 bg-white rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
          <div className="flex items-center mb-4">
            <FaMoneyBillWave className="text-blue-600 mr-2 text-3xl" />
            <h2 className="font-semibold text-lg text-gray-700">
              Total Income
            </h2>
          </div>
          <p className="text-3xl text-gray-800">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-red-600 mr-2 text-3xl" />
            <h2 className="font-semibold text-lg text-gray-700">
              Total Expenses
            </h2>
          </div>
          <p className="text-3xl text-gray-800">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div
          className={`p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl ${
            netIncome < 0 ? "bg-red-100" : "bg-green-100"
          }`}
        >
          <div className="flex items-center mb-4">
            <FaPiggyBank
              className={`mr-2 text-3xl ${
                netIncome < 0 ? "text-red-600" : "text-green-600"
              }`}
            />
            <h2 className="font-semibold text-lg text-gray-700">Net Income</h2>
          </div>
          <p className="text-3xl text-gray-800">{formatCurrency(netIncome)}</p>
        </div>
      </div>

      {/* Recent Income Entries */}
      <div className="mb-8 rounded-lg border p-4 bg-white shadow-lg">
        <h2 className="font-bold text-lg text-center mb-2 text-gray-800">
          Recent Income Entries
        </h2>
        <ul className="divide-y divide-gray-300">
          {incomeEntry.length ? (
            incomeEntry.map((entry, index) => (
              <li
                key={index}
                className="py-3 flex justify-between items-center text-gray-700 hover:bg-gray-100 transition duration-300"
              >
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-blue-600 mr-2" />
                  <span>
                    {entry.date}: {entry.source}
                  </span>
                </div>
                <span className="font-semibold">
                  {formatCurrency(entry.amount)}
                </span>
              </li>
            ))
          ) : (
            <li className="text-center py-2 text-gray-600">
              No income entries available.
            </li>
          )}
        </ul>
      </div>

      {/* Recent Expense Entries */}
      <div className="mb-8 rounded-lg border p-4 bg-white shadow-lg">
        <h2 className="font-bold text-lg text-center mb-2 text-gray-800">
          Recent Expense Entries
        </h2>
        <ul className="divide-y divide-gray-300">
          {expenses.length ? (
            expenses.map((expense, index) => (
              <li
                key={index}
                className="py-3 flex justify-between items-center text-gray-700 hover:bg-gray-100 transition duration-300"
              >
                <div className="flex items-center">
                  <FaClipboardList className="text-red-600 mr-2" />
                  <span>
                    {expense.date}: {expense.category}
                  </span>
                </div>
                <span className="font-semibold">
                  {formatCurrency(expense.amount)}
                </span>
              </li>
            ))
          ) : (
            <li className="text-center py-2 text-gray-600">
              No expense entries available.
            </li>
          )}
        </ul>
      </div>

      {/* Savings Goals Summary */}
      {goals.length > 0 && (
        <div className="mb-8 rounded-lg border p-4 bg-white shadow-lg">
          <h2 className="font-bold text-lg text-center mb-2 text-gray-800">
            Savings Goals
          </h2>
          <ul className="divide-y divide-gray-300">
            {goals.map((goal, index) => {
              const progress = (goal.currentSavings / goal.targetAmount) * 100;
              return (
                <li key={index} className="py-3">
                  <div className="flex justify-between items-center text-gray-700">
                    <span>
                      {goal.goalName}:{" "}
                      <strong className="font-semibold">
                        {formatCurrency(goal.currentSavings)}
                      </strong>{" "}
                      / {formatCurrency(goal.targetAmount)}
                    </span>
                    <span className="text-xs text-gray-600">
                      {progress.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full mt-1 h-2">
                    <div
                      className="bg-blue-800 h-full rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
