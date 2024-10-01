import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
