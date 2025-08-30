import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const isTokenExpired = (token:string) => {
    try {
        const decodedPayload = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = decodedPayload.exp * 1000;
        return Date.now() > expirationTime; 
    } catch (error) {
        return true; 
    }
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("blogger-api-auth-token");
  
    useEffect(() => {
      if (!authToken || isTokenExpired(authToken)) {
        localStorage.removeItem("blogger-api-auth-token"); 
        navigate("/auth/login", { replace: true });
      }
    }, [authToken, navigate]); // Run only when authToken or navigate changes
  
    if (!authToken || isTokenExpired(authToken)) {
      return null; // Return nothing while redirecting
    }
  
    return children; 
  };
  
  export default ProtectedRoute;