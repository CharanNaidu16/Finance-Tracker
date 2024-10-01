import { createSlice } from "@reduxjs/toolkit";

const loadIncomeEntriesFromLocalStorage = () => {
  const savedEntries = localStorage.getItem("incomeEntry");
  return savedEntries ? JSON.parse(savedEntries) : [];
};

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
      localStorage.setItem("incomeEntry", JSON.stringify(state.incomeEntry));
      state.formData = initialState.formData;
    },
    deleteIncomeEntry(state, action) {
      state.incomeEntry.splice(action.payload, 1);
      localStorage.setItem("incomeEntry", JSON.stringify(state.incomeEntry));
    },
    updateFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { addIncomeEntry, deleteIncomeEntry, updateFormData } =
  incomeSlice.actions;

export default incomeSlice.reducer;
