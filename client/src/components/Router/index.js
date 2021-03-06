import React from 'react';
import { Route } from "react-router-dom";
import Logout from "../Logout";
import SignUp from "../SignUp";
import Login from "../Login";
import StaffAdd from "../StaffAdd";
import PrivateRoute from '../../helpers/private-route';
import Search from "../Search";
import MovieAdd from '../MovieAdd';
import ViewMovie from '../ViewMovie';
import Movies from '../Movies';
import Home from '../Home';

const Router = () => (
  <>
    <PrivateRoute path="/logout" exact component={Logout} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/search" exact component={Search} />
    <Route path="/movie/:id" exact component={ViewMovie} />
    <Route path="/movies" exact component={Movies} />
    <Route path="/" exact component={Home}/>
    <PrivateRoute path="/create/staff" exact component={StaffAdd} />
    <PrivateRoute path="/create/movie" exact component={MovieAdd} />
  </>
  )
;

export default Router;