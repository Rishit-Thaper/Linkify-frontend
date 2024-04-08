import { useNavigate } from "react-router-dom";
import AuthDetails from "./AuthDetails";
import { useEffect } from "react";

export const AuthChecker = () => {
    const { isAuthenticated } = AuthDetails();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth");
        }
    }, [isAuthenticated, navigate]);

    return;
}
