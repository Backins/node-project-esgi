import React, {useContext} from 'react';
import { AuthContext } from "../Auth/AuthProvider";
import { Redirect } from 'react-router-dom';

const Logout = (classname) => {
  let { setUser } = useContext(AuthContext);

  const onClick = () => {
    sessionStorage.removeItem('jwt');
    setUser(null);
    return <Redirect to='/'/>
  };
  return ( <a href="#" className={classname.classname} onClick={() => onClick()}>Logout</a> );
};

export default Logout;