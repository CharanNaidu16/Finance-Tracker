import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./components/DashBoard.jsx";
import IncomeTracker from "./components/IncomeTracker.jsx";
import ExpenseTracker from "./components/ExpenseTracker.jsx";
import FinancialNews from "./components/FinancialNews.jsx";
import SavingsGoals from "./components/SavingsGoals.jsx";
import CurrencyConverter from "./components/CurrencyConverter.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/income",
        element: <IncomeTracker />,
      },
      {
        path: "/expenses",
        element: <ExpenseTracker />,
      },
      {
        path: "/savings",
        element: <SavingsGoals />,
      },
      {
        path: "/currency",
        element: <CurrencyConverter />,
      },
      {
        path: "/news",
        element: <FinancialNews />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
