import React from 'react';
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Login from '../screens/Login';
import OwnEarnerDashboard from '../screens/dashboard/OwnEarnerDashboard';
import Register from '../screens/Register';
import Payments from '../screens/Payments';
import Goal from '../screens/Goal';
import Referrals from '../screens/Referrals';
import { useSelector } from 'react-redux';
import AdminDashboard from '../screens/dashboard/AdminDashboard';
import Blog from '../screens/blog/Blog';
import Withdrawals from '../screens/Withdrawals';

const Router = () => {
  const role = useSelector((state) => state?.user?.user?.role);

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="own-earner-register/:firstName/:id" element={<Register/>}/>
      <Route  element={<ProtectedRoute path="dashboard" roles={["ownEarner", "admin"]}/>}><Route path="dashboard" element={role === "admin" ? <AdminDashboard/> : <OwnEarnerDashboard/>} /></Route>
      <Route  element={<ProtectedRoute path="payments" roles={["ownEarner", "admin"]}/>}><Route path="payments" element={<Payments/>} /></Route>
      <Route  element={<ProtectedRoute path="goal" roles={["ownEarner"]}/>} ><Route path="goal" element={<Goal/>} /></Route>
      <Route  element={<ProtectedRoute path="referrals" roles={["ownEarner"]}/>}><Route path="referrals" element={<Referrals/>} /></Route>
      <Route  element={<ProtectedRoute path="withrawals" roles={["ownEarner"]}/>}><Route path="withrawals" element={<Withdrawals/>} /></Route>
    </Routes>
  );
};

export default Router;