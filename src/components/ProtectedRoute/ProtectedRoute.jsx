import { useContext } from "react";
import { UserContext } from "../../Context/AllContext"
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { userLogin, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  if (!userLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
