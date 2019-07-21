import React,{ useState }  from 'react';
import { register } from '../../api/authentication';
import { makeStyles } from '@material-ui/core/styles';

export const formStyle = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: '3rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 1px 10px rgba(0,0,0,0.2)',
    padding: '2rem',
    borderRadius: '0.4rem',
    width: '40%'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    '&:not(:first-child)': {
      marginTop: '1rem'
    }
  },
  formGroupLabel: {
    display: 'flex',
    flexDirection: 'column',
    '&:not(:first-child)': {
      marginTop: '1rem'
    }
  },
  formGroupSpan: {
    fontSize: '1.1rem',
    padding: '.3rem 0',
  },
  formGroupInput: {
    fontSize: '1.1rem',
    height: '30px',
    border: 'none',
    borderBottom: '1px solid #34495e',
    transition: 'border-bottom .3s ease, background-color .3s ease',
    outline: 'none',
    '&:hover, &:active, &:focus': {
      borderBottom: '1px solid #f1c40f',
      backgroundColor: 'rgba(0,0,0,0.01)',
    }
  },
  formGroupButton: {
    marginTop: '2rem'
  },
  button: {
    display: 'block',
    padding: '0.5rem .8rem',
    borderRadius: '.3rem',
    backgroundColor: '#FFF',
    borderColor: '#f1c40f',
    color: '#34495e',
    margin: 'auto',
    cursor: 'pointer',
    transition: 'background-color .3s ease, color .3s ease',
    fontSize: '1.1rem',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: '#f1c40f',
      color: '#2c3e50'
    }
  },
  errors: {
    display: 'block',
    borderLeft: '5px solid #c0392b',
    color: '#c0392b',
    fontSize: '1.1rem',
    padding: '.5rem 1rem',
    '&:not(:first-child)': {
      marginTop: '1rem'
    }
  }
}));

const SignUp = (props) => {
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [secondPassword,setSecondPassword] = useState('');
  const [errors,setErrors] = useState([]);

  const classes = formStyle();

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
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        {errors.map(error => (
          <p key={error} className={classes.errors}>{error}</p>
        ))}
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Lastname:</span>
            <input className={classes.formGroupInput} type="text" value={lastname} name="firstname" onChange={e => setLastname(e.target.value)}/>
          </label>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Firstname:</span>
            <input className={classes.formGroupInput} type="text" value={firstname} name="lastname" onChange={e => setFirstname(e.target.value)}/>
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Email:</span>
            <input className={classes.formGroupInput} type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" />
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Password:</span>
            <input className={classes.formGroupInput} type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" />
          </label>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Reapeat password:</span>
            <input className={classes.formGroupInput} type="password" value={secondPassword} onChange={e => setSecondPassword(e.target.value)} name="password" />
          </label>
        </div>
        <div className={classes.formGroupButton}>
          <input type="submit" value="S'inscrire" className={classes.button} />
        </div>
      </form>
    </div>
  )
};

export default SignUp;