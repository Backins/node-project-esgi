import React, { useState, useEffect, useRef } from 'react';
import { getStaffs } from "../../api/staff";
import { getMovies} from "../../api/movie";
import { makeStyles } from '@material-ui/core/styles';
import Movie from "../Movie/index";

export const moviesStyle = makeStyles(theme => ({
    main: {
      marginTop: '2rem',
      display: 'flex',
      justifyContent: 'center'
    },
    container: {
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderRadius: '.3rem',
      padding: '1.5rem 1rem'
    },
    list: {
      listStyle: 'none',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    title: {
      fontSize: '2rem',
      textAlign: 'center'
    },
}));

const Movies = () => {

  const [movies, setMovies ] = useState([]);
  const ref = useRef( { mounted: false });

  const classes = moviesStyle();

  useEffect(() => {
    if(!ref.current.mounted) {
      getMovies().then((response) => {
        setMovies(response);
      }).catch((e) => {
        setMovies([{}]);
        console.log(e);
      });
      console.log(movies);
      ref.current = { mounted: true };
    }
  });


  return (
    <main className={classes.main}>
      <section className={classes.container}>
        <h1 className={classes.title}>Movie Gallery</h1>
        <ul className={classes.list}>
          {movies.map(movie => <Movie movie={movie}></Movie>)}
        </ul>
      </section>
    </main>
  );


};

export default Movies;