import React, { useContext }  from 'react';
import { BrowserRouter , NavLink } from "react-router-dom";
import Router from '../Router';
import { AuthContext } from "../Auth/AuthProvider";
import Logout from '../Logout';
import { makeStyles } from '@material-ui/core/styles';
import { flexbox } from '@material-ui/system';

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
    display: 'flex'
  },
  itemLink: {
    display: 'block',
    padding: '1rem 0.5rem',
    textDecoration: 'none',
    color: "#000",
    fontWeight: '600',
    borderBottom: '3px solid transparent',
    transition: 'background-color .3s ease, border .3s ease',
    '&:hover': {
      borderBottom: '3px solid black',
      backgroundColor: 'rgba(0,0,0,0.1)'
    }
  }, 
  itemLinkActive: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderBottom: '3px solid black'
  }, 
  itemLogout: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  itemLinkLogout: {
    display: 'flex',
    backgroundColor: '#34495e',
    color: '#FFF',
    borderRadius: '0.3rem',
    marginLeft: '5rem',
    alignItems: 'center',
    padding: '.5rem',
    textDecoration: 'none',
    transition: 'background-color .3s ease',
    '&:hover': {
      backgroundColor: '#2c3e50',
    }
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
              <NavLink className={classes.itemLink} exact to="/" activeClassName={classes.itemLinkActive}>Home</NavLink>
            </li>
            <li className={classes.item}><NavLink className={classes.itemLink} to="/search" activeClassName={classes.itemLinkActive}>Search</NavLink></li>
            {
              user ? <>
                  <li className={classes.item}><NavLink className={classes.itemLink} to="/create/staff" activeClassName={classes.itemLinkActive}>Add staff</NavLink></li>
                  <li className={classes.item}><NavLink className={classes.itemLink} to="/create/movie" activeClassName={classes.itemLinkActive}>Add movie</NavLink></li>
                  <li className={classes.itemLogout}><Logout classname={classes.itemLinkLogout}/></li>
                </>:
                <>
                  <li className={classes.item}>
                    <NavLink className={classes.itemLink} to="/login" activeClassName={classes.itemLinkActive}>Login</NavLink>
                  </li>
                  <li className={classes.item}>
                    <NavLink className={classes.itemLink} to="/signup" activeClassName={classes.itemLinkActive}>Sign up</NavLink>
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