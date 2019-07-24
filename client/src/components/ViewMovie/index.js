import React, { useState, useEffect, useRef } from 'react'
import { getMovieById } from '../../api/movie';
import { getStaffById } from '../../api/staff';
import { makeStyles } from '@material-ui/core/styles';
import validUrl from 'valid-url'; 
import createTypography from '@material-ui/core/styles/createTypography';
import BlocStaff from '../BlocStaff/index';

const movieByIdStyle = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: 'auto',
    justifyContent: 'center',
    marginTop: '5rem',
  },
  movieContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'top'
  },
  posterContainer: {
    width: '40%',
    padding: '0 1rem',
  },
  posterImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  movieList: {
    display: 'flex',
    width: '55%',
    flexDirection: 'column',
  },
  movieTitle: {
    marginBottom: '1.5rem'
  },
  movieYear: {
    marginBottom: '1rem',
    fontSize: '1.1rem',
  },
  categorysList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between'
  },
  categorysItem: {
    backgroundColor: '#f1c40f',
    color: 'black',
    padding: '.3rem',
    fontSize: '.9rem',
    fontWeight: '600'
  },
  staffs: {
    marginTop: '.5rem',
  },
  staffsList: {
    margin: '2rem 0',
    display: 'flex',
  },
}))

const ViewMovie = props => {
  const [poster, setPoster] = useState('https://www.tellerreport.com/images/no-image.png');
  const [altPoster, setAltPoster] = useState('No poster found for this movie');
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [realisator, setRealisator] = useState([]);
  const ref = useRef({ mounted: false });

  const classes = movieByIdStyle();

  useEffect(() => {
    const idMovie = props.match.params.id;
    if (!ref.current.mounted) {
      getMovieById(idMovie).then(response => {
        const movie = response;
        setMovie(movie);
        setCategorys(movie.category);
        if(movie.actors.length > 0 && movie.actors[0] !== "") {
          const actors = movie.actors;
          let arrayActors = [];
          actors.map(actor => {
              getStaffById(actor).then(response => {
                arrayActors = [...arrayActors, response];
              }).then(() => {
                setActors(arrayActors);
              });
              
          });
        }
        if(movie.realisator) {
          getStaffById(movie.realisator).then(response => {
            setRealisator(response);
          })
        }
        console.log(validUrl.isHttpUri(movie.urlPoster));
        if(movie.urlPoster !== undefined && validUrl.isHttpUri(movie.urlPoster)){
          setPoster(movie.urlPoster);
          setAltPoster(`${movie.title}'s poster`);
        }
      })
      ref.current = { mounted: true }
    }
  })

  return (
    <div className={classes.container}>
      <div className={classes.movieContainer}>
        <div className={classes.posterContainer}>
          <img src={poster} alt={altPoster} className={classes.posterImg}/>
        </div>
        <div className={classes.movieList}>
          <h1 className={classes.movieTitle}>{movie.title}</h1>
          <p className={classes.movieYear}>Année de sortie : {movie.year}</p>
          <ul className={classes.categorysList}>
            {categorys.map(category => <li className={classes.categorysItem}>{category}</li>)}
          </ul>
        </div>
      </div>
      <div className={classes.staffs}>
        <h2>Actors</h2>
        <div className={classes.staffsList}>
          {actors.map(actor => <BlocStaff staff={actor}></BlocStaff>)}
        </div>
      </div>
      <div className={classes.staffs}>
        <h2>Realisator</h2>
        {realisator.firstname ? (
          <div className={classes.staffsList}>
            <BlocStaff staff={realisator}></BlocStaff>
          </div>
        ):(
          <p>No realisator found</p>
        )}
      </div>
    </div>
  )
}

export default ViewMovie
