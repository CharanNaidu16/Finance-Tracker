import { createSlice } from "@reduxjs/toolkit";

// Function to load income entries from localStorage
const loadIncomeEntriesFromLocalStorage = () => {
  const savedEntries = localStorage.getItem("incomeEntry");
  return savedEntries ? JSON.parse(savedEntries) : [];
};

// Initial state with income entries loaded from localStorage
const initialState = {
  incomeEntry: loadIncomeEntriesFromLocalStorage(),
  formData: {
    amount: "",
    source: "",
    date: "",
    category: "",
    notes: "",
  },
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncomeEntry(state) {
      state.incomeEntry.push(state.formData);
      localStorage.setItem("incomeEntry", JSON.stringify(state.incomeEntry)); // Save to localStorage
      state.formData = initialState.formData; // Reset form data after adding entry
    },
    deleteIncomeEntry(state, action) {
      state.incomeEntry.splice(action.payload, 1);
      localStorage.setItem("incomeEntry", JSON.stringify(state.incomeEntry)); // Update localStorage
    },
    updateFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { addIncomeEntry, deleteIncomeEntry, updateFormData } =
  incomeSlice.actions;

export default incomeSlice.reducer;
