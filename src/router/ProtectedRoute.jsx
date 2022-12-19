import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layouts/side-menu/Main"
import ErrorPage from "../screens/ErrorPage";
import OwnEarnerSetup from "../screens/OwnEarnerSetup";

const ProtectedRoute = ({roles}) => {

  console.log(roles);

  const user = useSelector((state) => state?.user?.user);
  if (!user?.token) {
    return <Navigate to="/" replace />;
  }

  if(!roles?.includes(user?.role)) {
    return (
    
        <ErrorPage errorCode="419" title="Illegal Route: Permission denied" message="You are not supposed to be here as you are not authorized to this route." />
      
    )
}

  if(user?.role === "ownEarner" && !user?.isComplete){
    return <Layout><OwnEarnerSetup/></Layout>;
  }

  return <Layout><Outlet /></Layout>;
};
export default ProtectedRoute;
