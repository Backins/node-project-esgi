import React, { useState, useEffect, useRef } from 'react';
import { addMovie, getMovies } from "../../api/movie";
import { getStaffs } from "../../api/staff";
import { formStyle} from '../SignUp/index';

const MovieAdd = props => {

  const [title, setTitle ] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [actors, setActors] = useState('');
  const [realisator, setRealisator] = useState('');
  const [errors, setErrors] = useState([]);
  const ref = useRef( { mounted: false });
  const [staffs, setStaffs] = useState([]);

  const classes = formStyle();

  useEffect(() => {
    if(!ref.current.mounted) {
      getStaffs().then((response) => {
        setStaffs(response);
      });

      ref.current = { mounted: true };
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    let err = [];

    if (!title) {
      err.push('Invalid title');
    }
    if (!category) {
      err.push('Invalid category');
    }
    if (err.length){
      setErrors(err)
    }
    else {

      addMovie({
        title,
        year,
        posterPath,
        category,
        actors,
        realisator
      }).then(response =>
      {
          if (response._id) {
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

  const handleChangeActors = (e) => {
    const options = e.target.childNodes;
    let tmpActors = [];

    options.forEach(option => {
      if(option.selected && option.value){
        tmpActors.push(option.value);
      }
    })
    setActors(tmpActors);
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
            <span className={classes.formGroupSpan}>Title</span>
            <input className={classes.formGroupInput} required={true} type="text" value={title} onChange={e => setTitle(e.target.value)}/>
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>URL du poster</span>
            <input className={classes.formGroupInput} required={true} type="text" value={posterPath} onChange={e => setPosterPath(e.target.value)}/>
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Year</span>
            <input className={classes.formGroupInput} required={true} type="number" value={year} onChange={e => setYear(e.target.value)}/>
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Category</span>
            <input className={classes.formGroupInput} required={true} type="text" value={category} onChange={e => setCategory(e.target.value)}/>
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Acteurs</span>
            <select multiple={true} onChange={e => handleChangeActors(e)}>
              {staffs.map( staff => <option value={staff._id}>{staff.firstname + ' ' + staff.lastname}</option>)}
            </select>
          </label>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formGroupLabel}>
            <span className={classes.formGroupSpan}>Réalisateur</span>
            <select className={classes.formGroupInput} multiple={false} onChange={e => setRealisator(e.target.value)}>
              <option value="" defaultValue disabled>Sélectionner une personne</option>
              {staffs.map( staff => <option value={staff._id}>{staff.firstname + ' ' + staff.lastname}</option>)}
            </select>
          </label>
        </div>
        <div className={classes.formGroupButton}>
          <input type="submit" value="Add movie" onClick={handleSubmit} className={classes.button}/>
        </div>
      </form>
    </div>
  );


};

export default MovieAdd;