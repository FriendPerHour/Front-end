import { useContext } from "react";
import { UserContext } from "../../Context/AllContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { userLogin, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  if (!userLogin) {
    return <Navigate to="/login" replace />;
  }

  const userRoles =
    userLogin?.roles?.map((userRole) => userRole.role?.name) || [];

  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = userRoles.some((role) =>
      allowedRoles.includes(role)
    );

    if (!hasAllowedRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}
