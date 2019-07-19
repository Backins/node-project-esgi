import React, { createContext, Component } from "react";
import decode  from 'jwt-decode';
import actions from './actions';
import publicActions from '../../helpers/public-actions';

export const AuthContext = createContext({});

class AuthProvider extends Component {

  state = {
    user: null,
  };

  setUser = user => this.setState(user);

  componentDidMount(){
    const token = sessionStorage.getItem('jwt');
    if(token) this.setState({user :decode(token)});
  }

  render() {
    return (
      <AuthContext.Provider value={{ ...this.state, ...publicActions(this, actions) }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;