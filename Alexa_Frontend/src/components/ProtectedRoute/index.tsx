import { Navigate } from "react-router-dom";
import { useAuth, AuthProviderProps } from "../../hooks/useAuth";

export const ProtectedRoute = ({ children }: AuthProviderProps) => {
  const { user }: any = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
