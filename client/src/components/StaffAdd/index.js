import React, { useState } from 'react';
import { addStaff } from "../../api/staff";

const StaffAdd = props => {
  // {
  //   firstname,
  //     lastname,
  //     nationality: String,
  //   biography: String,
  //   birthday: Date,
  //   createdAt: Date,
  // }

  const [firstname, setFirstname ] = useState('');
  const [lastname, setLastname] = useState('');
  const [nationality, setNationality] = useState('');
  const [biography, setBiography] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errors, setErrors] = useState([]);

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


  return <form>
    {errors.map(error => (
        <div key={error}>
          {error}
        </div>
    ))}
    <div>
      <label>Firstname</label>
      <input required={true} type="text" value={firstname} onChange={e => setFirstname(e.target.value)}/>
    </div>
    <div>
      <label>Lastname</label>
      <input required={true} type="text" value={lastname} onChange={e => setLastname(e.target.value)}/>
    </div>
    <div>
      <label>Nationality</label>
      <input  type="text" value={nationality} onChange={e => setNationality(e.target.value)}/>
    </div>
    <div>
      <label>Biography</label>
      <textarea type="text" value={biography} onChange={e => setBiography(e.target.value)}/>
    </div>
    <div>
      <label>Birthday</label>
      <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
    </div>
    <input type="submit" value="Send" onClick={handleSubmit}/>
  </form>


};

export default StaffAdd;