import { useSelector } from "react-redux";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import { Navigate } from "react-router-dom";
>>>>>>> ed4519ac69aab03135b8884b8f0ac7c391f7e929

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

<<<<<<< HEAD
  if (isAuthenticated) {
    return navigate("/");
  }
=======
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);  
    
    if(isAuthenticated){
        return <Navigate to={'/'} />
    }
>>>>>>> ed4519ac69aab03135b8884b8f0ac7c391f7e929

  return children;
};

export default PublicRoute;
