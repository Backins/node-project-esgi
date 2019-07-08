import React, { createContext, Component } from "react";
import decode  from 'jwt-decode';
import { login as loginApi , register as registerAPI } from '../../api/authentication';
import actions from './actions';
import publicActions from '../../helpers/public-actions';

export const AuthContext = createContext({});

class AuthProvider extends Component {

  state = {
    user: null,
  };

  componentDidMount(){
    const token = sessionStorage.getItem('jwt');
    if(token) this.setState({user :decode(token)});
  }

  login = async (email, password) => {
    var response;
    try {
      response  =  await loginApi({ email, password});
    }catch (e) {
      return false;
    }

    if(response.token){
      const token = response.token;
      sessionStorage.setItem('jwt', token);
      this.setState({user :decode(token)});
      return true;
    }
    return false
  };

register = async (firstname,lastname,email, password) => {
    var response;
    try {
      response  =  await registerAPI({ firstname, lastname, email, password});
    }catch (e) {
      return false;
    }
    if(response) return true;
    return false
  };

  logout = () => {
    sessionStorage.removeItem('jwt');
    this.setState({user : null});
  };


  render() {
    return (
      <AuthContext.Provider value={{ ...this.state, ...publicActions(this, actions) }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;