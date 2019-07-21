import React, {useContext,useState} from 'react';
import { AuthContext } from "../Auth/AuthProvider";
import { login } from '../../api/authentication';
import decode from "jwt-decode";
import { formStyle} from '../SignUp/index';

const Login = (props) => {
  let { setUser } = useContext(AuthContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  let [errors,setErrors] = useState({'email' : '','connection':''});

  const classes = formStyle();

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
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Email:</span>
            <input className={classes.formGroupInput} id="email" type="email" value={email} onChange={handleChange} />
            { errors.email ? <label>{errors.email}</label> : <></>}
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Password:</span>
            <input className={classes.formGroupInput} id="password" type="password" value={password} onChange={handleChange} />
          </label>
        </div>
        <div className={classes.formGroupButton}>
          <input className={classes.button} type="submit" value="Sign in" />
        </div>
        { errors.connection ? <label className={classes.errors}>{errors.connection}</label> : <></>}
      </form>
    </div>
  );
};

export default Login;