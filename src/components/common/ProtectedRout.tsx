import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken, getUser } from "../../service/TokenService";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  // 1. Check if user is logged in
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. If no role restriction, allow access
  if (!allowedRoles) {
    return <>{children}</>;
  }

  // 3. Read user information from localStorage
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 4. Check role
  const hasRole = user.roles.some((role) => allowedRoles.includes(role));

  if (!hasRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
