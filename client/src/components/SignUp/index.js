import React,{ useState }  from 'react';
import { register } from '../../api/authentication';

const SignUp = (props) => {
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [secondPassword,setSecondPassword] = useState('');
  const [errors,setErrors] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    let err = [];

    if (!email) {
      err.push('Invalid email');
    }
    if (!password) {
      err.push('Invalid passord');
    }
    if (password !== secondPassword) {
      err.push('Passwords are not identical');
    }
    setErrors(err);
    if(err.length === 0){
      register({firstname,lastname,email,password}).then( response => {
        if(response){
          const serverError  = Object.keys(response).map(key => response[key].message);
          err = [...err,...serverError];
        }
        if(!err.length) {
          props.history.push(`/`);
        } else {
          setErrors(err);
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.map(error => (
        <p key={error}>{error}</p>
      ))}
      <div className="form-group">
        <label>
          <span>Lastname:</span>
          <input type="text" value={lastname} name="firstname" onChange={e => setLastname(e.target.value)}/>
        </label>
        <label>
          <span>Firstname:</span>
          <input type="text" value={firstname} name="lastname" onChange={e => setFirstname(e.target.value)}/>
        </label>
      </div>
      <div className="form-group">
        <label>
          <span>Email:</span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" />
        </label>

        <label>
          <span>Password:</span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />
        </label>
        <label>
          <span>Reapeat password:</span>
          <input type="password" value={secondPassword} onChange={e => setSecondPassword(e.target.value)} name="password" />
        </label>
      </div>

      <input type="submit" value="S'inscrire" className="submit" />
    </form>
  )
};

export default SignUp;