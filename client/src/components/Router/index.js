import React from 'react';
import { Route } from "react-router-dom";
import Logout from "../Logout";
import SignUp from "../SignUp";
import Login from "../Login";
import StaffAdd from "../StaffAdd";
import PrivateRoute from '../../helpers/private-route';
import Search from "../Search";

const Router = () => (
  <>
    <PrivateRoute path="/logout" exact component={Logout} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/search" exact component={Search} />
    <PrivateRoute path="/create/staff" exact component={StaffAdd} />
  </>
  )
;

export default Router;