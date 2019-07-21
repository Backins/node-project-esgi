import React, { useContext }  from 'react';
import { BrowserRouter , Link } from "react-router-dom";
import Router from '../Router';
import { AuthContext } from "../Auth/AuthProvider";
import Logout from '../Logout';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    '*': {
      padding: '0',
      margin: '0'
    }
  },
  menu: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f1c40f'
  },
  item: {
    transition: 'background-color .3s ease',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    }
  },
  itemLink: {
    display: 'block',
    padding: '1rem 0.5rem',
    textDecoration: 'none',
    width: '100%',
    height: '100%',
  }
}));

const NavBar = () => {
  let { user } = useContext(AuthContext);

  const classes = useStyles();

  return  (
    <BrowserRouter>
      <div>
        <nav>
          <ul className={classes.menu}>
            <li className={classes.item}>
              <Link className={classes.itemLink} to="/">Home</Link>
            </li>
            <li className={classes.item}><Link className={classes.itemLink} to="/search">Search</Link></li>
            {
              user ? <>
                  <li className={classes.item}><Logout className={classes.itemLink}/></li>
                  <li className={classes.item}><Link className={classes.itemLink} to="/create/staff">Add staff</Link></li>
                  <li className={classes.item}><Link className={classes.itemLink} to="/create/movie">Add movie</Link></li>
                </>:
                <>
                  <li className={classes.item}>
                    <Link className={classes.itemLink} to="/login">Login</Link>
                  </li>
                  <li className={classes.item}>
                    <Link className={classes.itemLink} to="/signup">Sign up</Link>
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