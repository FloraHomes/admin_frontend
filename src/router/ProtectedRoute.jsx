import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layouts/side-menu/Main"
import OwnEarnerSetup from "../screens/OwnEarnerSetup";

const ProtectedRoute = () => {

  const user = useSelector((state) => state?.user?.user);
  if (!user?.token) {
    return <Navigate to="/" replace />;
  }

  if(user?.role === "ownEarner" && !user?.isComplete){
    return <Layout><OwnEarnerSetup/></Layout>;
  }

  return <Layout><Outlet /></Layout>;
};
export default ProtectedRoute;
