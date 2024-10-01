// src/components/SavingsGoals.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGoal, updateGoal, deleteGoal } from "../store/savingsGoalsSlice";

const SavingsGoals = () => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.savingsGoals.goals);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [amountToAdd, setAmountToAdd] = useState("");
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      goalName,
      targetAmount: parseFloat(targetAmount),
      currentSavings: parseFloat(currentSavings),
      monthlyContribution: parseFloat(monthlyContribution),
      deadline,
    };
    dispatch(addGoal(newGoal));
    resetForm();
  };

  const resetForm = () => {
    setGoalName("");
    setTargetAmount(0);
    setCurrentSavings(0);
    setMonthlyContribution(0);
    setDeadline("");
  };

  const handleAddToGoal = (index) => {
    if (amountToAdd && !isNaN(amountToAdd)) {
      dispatch(updateGoal({ index, amount: parseFloat(amountToAdd) }));
      setAmountToAdd("");
      setSelectedGoalIndex(null);
    }
  };

  const handleDeleteGoal = (index) => {
    dispatch(deleteGoal(index));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-10 mx-auto max-w-4xl">
      {/* Savings Goals Form */}
      <div className="p-8 rounded-lg flex-1 bg-gradient-to-r from-[#f4e4ba] to-[#e0cda6] shadow-lg transition-transform duration-200 hover:scale-105">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Savings Goals Tracker
        </h2>
        <form onSubmit={handleSubmit} className="mb-4">
          {[
            {
              label: "Goal Name",
              type: "text",
              value: goalName,
              setter: setGoalName,
            },
            {
              label: "Target Amount",
              type: "number",
              value: targetAmount,
              setter: setTargetAmount,
            },
            {
              label: "Current Savings",
              type: "number",
              value: currentSavings,
              setter: setCurrentSavings,
            },
            {
              label: "Monthly Contribution",
              type: "number",
              value: monthlyContribution,
              setter: setMonthlyContribution,
            },
          ].map(({ label, type, value, setter }) => (
            <div className="mb-4" key={label}>
              <label className="block mb-1">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                required
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block mb-1">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white rounded-md px-4 py-2 w-full hover:bg-blue-800 transition duration-200"
          >
            Add Goal
          </button>
        </form>
      </div>

      {/* Goals List */}
      {goals.length > 0 && (
        <div className="rounded-lg flex-1 bg-gradient-to-r from-[#f4e4ba] to-[#e0cda6] p-4 shadow-lg mt-8 md:mt-0 md:ml-4">
          <h3 className="text-lg font-bold mb-4 text-center">Your Goals:</h3>
          <ul className="space-y-4">
            {goals.map((goal, index) => {
              const progress = (
                (goal.currentSavings / goal.targetAmount) *
                100
              ).toFixed(2);
              return (
                <li
                  key={index}
                  className="p-4 border border-gray-300 rounded-md shadow hover:shadow-lg transition-shadow duration-200"
                >
                  <h4 className="font-semibold text-lg">{goal.goalName}</h4>
                  <p className="text-gray-700">
                    Target Amount: ₹{goal.targetAmount}
                  </p>
                  <p className="text-gray-700">
                    Current Savings: ₹{goal.currentSavings}
                  </p>
                  <p className="text-gray-700">
                    Monthly Contribution: ₹{goal.monthlyContribution}
                  </p>
                  <p className="text-gray-700">Deadline: {goal.deadline}</p>
                  <div className="w-full bg-gray-200 rounded-full mt-2 h-2">
                    <div
                      className="bg-blue-900 h-full rounded-full"
                      style={{ width: `${progress}%` }}
                    >
                      <span className="text-xs font-medium text-white">
                        {progress}%
                      </span>
                    </div>
                  </div>

                  {/* Input for adding money */}
                  <div className="mt-4">
                    <input
                      type="number"
                      value={selectedGoalIndex === index ? amountToAdd : ""}
                      onChange={(e) => {
                        setAmountToAdd(e.target.value);
                        setSelectedGoalIndex(index);
                      }}
                      placeholder="Add Amount"
                      className="border-2 border-gray-300 rounded-md p-2 w-full focus:ring focus:ring-blue-300"
                    />
                    <button
                      onClick={() => handleAddToGoal(index)}
                      className="mt-2 bg-green-600 text-white rounded-md px-4 py-2 w-full hover:bg-green-700 transition duration-200"
                    >
                      Add to Goal
                    </button>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteGoal(index)}
                    className="mt-2 bg-red-600 text-white rounded-md px-4 py-2 w-full hover:bg-red-700 transition duration-200"
                  >
                    Delete Goal
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SavingsGoals;
