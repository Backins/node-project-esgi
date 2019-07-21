import React, { useState } from 'react';
import { addStaff } from "../../api/staff";
import { formStyle} from '../SignUp/index';

const StaffAdd = props => {

  const [firstname, setFirstname ] = useState('');
  const [lastname, setLastname] = useState('');
  const [nationality, setNationality] = useState('');
  const [biography, setBiography] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState([]);

  const classes = formStyle();

  const handleSubmit = event => {
    event.preventDefault();
    let err = [];

    if (!firstname) {
      err.push('Invalid firstname');
    }
    if (!lastname) {
      err.push('Invalid lastname');
    }
    if (err.length){
      setErrors(err)
    }
    else {

      addStaff({
        firstname,
        lastname,
        nationality,
        biography,
        birthday,
      }).then(response =>
      {
          if (response.id) {
            props.history.push(`/`);
          } else {
            Object.keys(response).forEach(key => {
              const val = key + ' ' + response[key].message;
              err = [...err, val];
            });
            setErrors(err);
          }
      })
    }
  };


  return (
    <div className={classes.container}>
      <form className={classes.form}>
        {errors.map(error => (
            <div key={error} className={classes.errors}>
              {error}
            </div>
        ))}
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Firstname</span>
            <input className={classes.formGroupInput} required={true} type="text" value={firstname} onChange={e => setFirstname(e.target.value)}/>
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Lastname</span>
            <input className={classes.formGroupInput} required={true} type="text" value={lastname} onChange={e => setLastname(e.target.value)}/>
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Nationality</span>
            <input className={classes.formGroupInput}  type="text" value={nationality} onChange={e => setNationality(e.target.value)}/>
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Biography</span>
            <textarea className={classes.formGroupTextarea} type="text" value={biography} onChange={e => setBiography(e.target.value)}/>
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Birthday</span>
            <input className={classes.formGroupInput} type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
          </label>
        </div>
        <div className={classes.formGroupButton}>
          <input type="submit" value="Send" onClick={handleSubmit} className={classes.button}/>
        </div>
      </form>
    </div>
  );

};

export default StaffAdd;