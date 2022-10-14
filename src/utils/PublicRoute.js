import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../components/UI/spinners/Spinner";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const isLoading = useSelector(state => state.loader.showLoader);

  if(isLoading)
    return <Spinner />
  
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default PublicRoute;
