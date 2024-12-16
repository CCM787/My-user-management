import { ToastContainer } from "react-toastify";
import "./App.css";
import { RoutesComponent } from "./routes";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RoutesComponent />
    </>
  );
}

export default App;
