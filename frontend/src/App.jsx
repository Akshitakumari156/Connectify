import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import Home from "./Components/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/enter"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/enter" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
}