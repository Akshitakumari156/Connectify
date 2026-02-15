import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function PublicRoute({ children }) {
  if (isLoggedIn()) {
    return <Navigate to="/enter" replace />;
  }

  return children;
}