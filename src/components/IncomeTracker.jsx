import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncomeEntry,
  deleteIncomeEntry,
  updateFormData,
} from "../store/incomeSlice";

const IncomeTracker = () => {
  const dispatch = useDispatch();
  const { incomeEntry, formData } = useSelector((state) => state.income);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIncomeEntry());
  };

  const handleDelete = (index) => {
    dispatch(deleteIncomeEntry(index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const totalIncome = incomeEntry.reduce(
    (total, entry) => total + Number(entry.amount),
    0
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-10 mx-auto max-w-4xl">
      {/* Income Tracker Form */}
      <div className="rounded-lg p-6 flex-1 bg-gradient-to-r from-[#f4e4ba] to-[#e0cda6] shadow-lg transition-transform duration-200 hover:scale-105">
        <h1 className="text-center font-bold text-2xl mb-4">Income Tracker</h1>
        <p className="text-center text-xl font-semibold">
          Total Income: ₹{totalIncome.toFixed(2)}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block mb-1 text-lg capitalize font-medium">
                {key}
              </label>
              {key === "notes" ? (
                <textarea
                  className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                  name={key}
                  placeholder="Notes"
                  value={formData[key]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  className="w-full rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type={key === "date" ? "date" : "text"}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formData[key]}
                  onChange={handleChange}
                  required={key !== "notes"}
                />
              )}
            </div>
          ))}
          <button className="bg-blue-600 w-full text-white h-10 rounded-md mb-5 hover:bg-blue-900 transition duration-200">
            Add Income
          </button>
        </form>
      </div>

      {/* Income Entries List */}
      {incomeEntry.length > 0 && (
        <div className="rounded-lg border border-gray-300 p-6 flex-1 bg-gradient-to-r from-[#f4e4ba] to-[#e0cda6] shadow-lg transition-transform duration-200 hover:scale-105">
          <h2 className="font-bold text-lg text-center mb-4">Income Entries</h2>
          <ul className="space-y-2">
            {incomeEntry.map((entry, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-4 rounded-md transition duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
                }`}
              >
                <span className="text-gray-700">
                  <p>
                    <strong>Amount:</strong> ₹{entry.amount} <br />
                  </p>
                  <strong>Source:</strong> {entry.source} <br />
                  <strong>Date:</strong> {entry.date} <br />
                  <strong>Category:</strong> {entry.category} <br />
                  {entry.notes && <strong>Notes:</strong>} {entry.notes}
                </span>
                <button
                  className="bg-red-600 text-white h-8 border-2 border-gray-300 rounded-md px-4 hover:bg-red-700 transition duration-200"
                  onClick={() => handleDelete(index)}
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

export default IncomeTracker;
