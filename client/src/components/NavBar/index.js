import React, { useContext }  from 'react';
import { BrowserRouter , Link } from "react-router-dom";
import Router from '../Router';
import { AuthContext } from "../Auth/AuthProvider";
import Logout from '../Logout';

const NavBar = () => {
  let { user } = useContext(AuthContext);

  return  (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
            </li>
            <li><Link to="/search">🔍</Link></li>
            {
              user ? <>
                <Logout/>
                  <li><Link to="/create/staff">Add staff</Link></li>
                  <li><Link to="/create/movie">Add movie</Link></li>
                </>:
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                </>
            }

          </ul>
        </nav>
        <Router />
      </div>
    </BrowserRouter>
  );
};

export default NavBar;