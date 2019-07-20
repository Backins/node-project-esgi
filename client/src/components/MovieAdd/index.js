import React, { useState, useEffect } from 'react';
import { addMovie } from "../../api/movie";

const MovieAdd = props => {

  const [title, setTitle ] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [staffs, setStaffs] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log('coucou');
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
      <label>Staffs</label>
      <textarea type="text" value={staffs} onChange={e => setStaffs(e.target.value)}/>
    </div>
    <input type="submit" value="Send" onClick={handleSubmit}/>
  </form>


};

export default MovieAdd;