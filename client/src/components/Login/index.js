import React, {useContext,useState} from 'react';
import { AuthContext } from "../Auth/AuthProvider";
import { login } from '../../api/authentication';
import decode from "jwt-decode";

const Login = (props) => {
  let { setUser } = useContext(AuthContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  let [errors,setErrors] = useState({'email' : '','connection':''});

  const handleSubmit = e => {
    e.preventDefault();

    login({email,password}).then( res =>{
      if(res.token){
        const token = res.token;
        sessionStorage.setItem('jwt', token);
        setUser({user :decode(token)});
        props.history.push(`/`);
      } else {
        setErrors({connection: res.error});
      }
    });
  };

  const handleChange = event => {
    if(event.target.id === 'email') {
      setEmail(event.target.value);

      const emailValid = event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

      if (!emailValid) errors['email']= 'Invalid mail';
      else errors['email']= '';

      setErrors(errors)
    }
    else if (event.target.id === 'password') setPassword(event.target.value);
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input id="email" type="email" value={email} onChange={handleChange} />
        { errors.email ? <label>{errors.email}</label> : <></>}
      </label>
      <label>
        Password:
        <input id="password" type="password" value={password} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
      { errors.connection ? <label>{errors.connection}</label> : <></>}
    </form>
  );
};

export default Login;