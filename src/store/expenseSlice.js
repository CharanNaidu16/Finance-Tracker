import { createSlice } from "@reduxjs/toolkit";

const loadExpensesFromLocalStorage = () => {
  const savedExpenses = localStorage.getItem("expenses");
  return savedExpenses ? JSON.parse(savedExpenses) : [];
};

const initialState = {
  expenses: loadExpensesFromLocalStorage(),
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },
  },
});

export const { addExpense, deleteExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
