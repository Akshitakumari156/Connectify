import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Home from "./Components/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/enter" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}