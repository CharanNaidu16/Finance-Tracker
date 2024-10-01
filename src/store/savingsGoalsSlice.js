import { createSlice } from "@reduxjs/toolkit";

const loadGoalsFromLocalStorage = () => {
  const savedGoals = localStorage.getItem("savingsGoals");
  return savedGoals ? JSON.parse(savedGoals) : [];
};

const initialState = {
  goals: loadGoalsFromLocalStorage(),
};

const savingsGoalsSlice = createSlice({
  name: "savingsGoals",
  initialState,
  reducers: {
    addGoal(state, action) {
      state.goals.push(action.payload);
      localStorage.setItem("savingsGoals", JSON.stringify(state.goals));
    },
    updateGoal(state, action) {
      const { index, amount } = action.payload;
      if (state.goals[index]) {
        state.goals[index].currentSavings += amount;
        localStorage.setItem("savingsGoals", JSON.stringify(state.goals));
      }
    },
    deleteGoal(state, action) {
      state.goals.splice(action.payload, 1);
      localStorage.setItem("savingsGoals", JSON.stringify(state.goals));
    },
  },
});

export const { addGoal, updateGoal, deleteGoal } = savingsGoalsSlice.actions;
export default savingsGoalsSlice.reducer;
