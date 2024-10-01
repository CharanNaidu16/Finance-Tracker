import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "./incomeSlice";
import expenseReducer from "./expenseSlice";
import savingsGoalsReducer from "./savingsGoalsSlice";

const store = configureStore({
  reducer: {
    income: incomeReducer,
    expenses: expenseReducer,
    savingsGoals: savingsGoalsReducer,
  },
});

export default store;
