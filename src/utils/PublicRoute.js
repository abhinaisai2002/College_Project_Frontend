
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

const PublicRoute = ({children}) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);  
    const navigate = useNavigate();
    
    if(isAuthenticated){
        return navigate("/");
    }

    return children;
};

export default PublicRoute;

