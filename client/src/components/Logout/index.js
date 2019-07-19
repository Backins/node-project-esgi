import React, {useContext} from 'react';
import { AuthContext } from "../Auth/AuthProvider";

const Logout = (props) => {
  let { setUser } = useContext(AuthContext);

  const onClick = () => {
    sessionStorage.removeItem('jwt');
    setUser(null)
    props.history.push(`/`);
  };
  return ( <button onClick={() => onClick()}>Logout</button> );
};

export default Logout;