import "./App.scss";
import Layout from "./Layout";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
