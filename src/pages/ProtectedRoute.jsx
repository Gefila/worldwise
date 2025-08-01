import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

export default function ProtectedRoute({children}) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}