import React, { useState, useEffect } from 'react';
import { addMovie } from "../../api/movie";
import { getStaffs } from "../../api/staff";

const MovieAdd = props => {

  const [title, setTitle ] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [actors, setActors] = useState('');
  const [realisator, setRealisator] = useState('');
  const [errors, setErrors] = useState([]);
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    getStaffs().then((response) => {
      console.log(response);
      setStaffs(response);
    });
  });

  const handleSubmit = event => {
    event.preventDefault();
    let err = [];

    if (!title) {
      err.push('Invalid firstname');
    }
    if (!category) {
      err.push('Invalid lastname');
    }
    if (err.length){
      setErrors(err)
    }
    else {

      addMovie({
        title,
        year,
        category,
        staffs,
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
      <label>Title</label>
      <input required={true} type="text" value={title} onChange={e => setTitle(e.target.value)}/>
    </div>
    <div>
      <label>Year</label>
      <input required={true} type="number" value={year} onChange={e => setYear(e.target.value)}/>
    </div>
    <div>
      <label>Category</label>
      <input  required={true} type="text" value={category} onChange={e => setCategory(e.target.value)}/>
    </div>
    <div>
      <label>Acteurs</label>
      <select multiple={true}>
        <option>Sélectionner des personnes</option>
        {staffs.map(staff => <option>{staff.firstname + ' ' + staff.lastname}</option>)}
      </select>
    </div>
    <div>
      <label>Réalisateur</label>
      <select multiple={false}>
        <option>Sélectionner une personne</option>
        {staffs.map(staff => <option>{staff.firstname + ' ' + staff.lastname}</option>)}
      </select>
    </div>
    <input type="submit" value="Send" onClick={handleSubmit}/>
  </form>


};

export default MovieAdd;