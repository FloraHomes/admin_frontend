import React from 'react';
import { Route, Routes, useRoutes } from "react-router-dom";

import Inbox from "../views/inbox/Main";
import FileManager from "../views/file-manager/Main";
import PointOfSale from "../views/point-of-sale/Main";
import Chat from "../views/chat/Main";
import Post from "../views/post/Main";
import Calendar from "../views/calendar/Main";
import CrudDataList from "../views/crud-data-list/Main";
import CrudForm from "../views/crud-form/Main";
import UsersLayout1 from "../views/users-layout-1/Main";
import UsersLayout2 from "../views/users-layout-2/Main";
import UsersLayout3 from "../views/users-layout-3/Main";
import ProfileOverview1 from "../views/profile-overview-1/Main";
import ProfileOverview2 from "../views/profile-overview-2/Main";
import ProfileOverview3 from "../views/profile-overview-3/Main";
import WizardLayout1 from "../views/wizard-layout-1/Main";
import WizardLayout2 from "../views/wizard-layout-2/Main";
import WizardLayout3 from "../views/wizard-layout-3/Main";
import BlogLayout1 from "../views/blog-layout-1/Main";
import BlogLayout2 from "../views/blog-layout-2/Main";
import BlogLayout3 from "../views/blog-layout-3/Main";
import PricingLayout1 from "../views/pricing-layout-1/Main";
import PricingLayout2 from "../views/pricing-layout-2/Main";
import InvoiceLayout1 from "../views/invoice-layout-1/Main";
import InvoiceLayout2 from "../views/invoice-layout-2/Main";
import FaqLayout1 from "../views/faq-layout-1/Main";
import FaqLayout2 from "../views/faq-layout-2/Main";
import FaqLayout3 from "../views/faq-layout-3/Main";
import ErrorPage from "../views/error-page/Main";
import UpdateProfile from "../views/update-profile/Main";
import ChangePassword from "../views/change-password/Main";
import RegularTable from "../views/regular-table/Main";
import Tabulator from "../views/tabulator/Main";
import Modal from "../views/modal/Main";
import SlideOver from "../views/slide-over/Main";
import Notification from "../views/notification/Main";
import Tab from "../views/tab/Main";
import Accordion from "../views/accordion/Main";
import Button from "../views/button/Main";
import Alert from "../views/alert/Main";
import ProgressBar from "../views/progress-bar/Main";
import WysiwygEditor from "../views/wysiwyg-editor/Main";

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
      <Route path="/a" element={<WysiwygEditor/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="own-earner-register/:firstName/:id" element={<Register/>}/>
      <Route  element={<ProtectedRoute path="dashboard" roles={["ownEarner", "admin"]}/>}><Route path="dashboard" element={role === "admin" ? <AdminDashboard/> : <OwnEarnerDashboard/>} /></Route>
      <Route  element={<ProtectedRoute path="payments" roles={["ownEarner", "admin"]}/>}><Route path="payments" element={<Payments/>} /></Route>
      <Route  element={<ProtectedRoute path="goal" roles={["ownEarner"]}/>} ><Route path="goal" element={<Goal/>} /></Route>
      <Route  element={<ProtectedRoute path="referrals" roles={["ownEarner"]}/>}><Route path="referrals" element={<Referrals/>} /></Route>
      <Route  element={<ProtectedRoute path="withrawals" roles={["ownEarner"]}/>}><Route path="withrawals" element={<Withdrawals/>} /></Route>
      <Route  element={<ProtectedRoute path="blog" roles={["admin"]}/>}><Route path="blog" element={<Blog/>} /></Route>
    </Routes>
  );
};

export default Router;