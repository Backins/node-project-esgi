import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const movieStyle = makeStyles(theme => ({
    li: {
        display: 'flex',
        width: '45%',
        marginLeft: '2rem',
        marginTop: '2rem'
      },
      inner: {
        position: 'relative',
        paddingTop: '100%',
        width: '100%',
        boxShadow: '1px 1px 10px rgba(0,0,0,0.2)',
        transition: 'box-shadow ease .4s, transform ease .4s',
        backgroundColor: '#f39c12',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '1px 1px 10px rgba(0,0,0,0.5)',
          transform: 'scale(1.01)',
        }
      },
      content: {
        position: 'absolute',
        backgroundColor: '#FFF',
        top: '50%',
        bottom: '0',
        left: '0',
        right: '0',
        padding: '1rem',
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          left: '0',
          right: '0',
          bottom: '99%',
          borderBottom: '30px solid #FFF',
          borderRight: '600px solid transparent',
        }
      },
      link: {
        display: 'block',
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        textDecoration: 'none',
        padding: '.3rem .5rem',
        backgroundColor: '#34495e',
        color: '#ecf0f1',
      },
      background: {
        position: 'absolute',
        top: '0',
        bottom: '50%',
        right: '0',
        left: '0',
      },
      image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
}));

const Movie = (props) => {
    const [movie, setMovie] = useState([]);
    const [poster, setPoster] = useState('https://www.tellerreport.com/images/no-image.png');
    const [altPoster, setAltPoster] = useState('No poster found for this movie');

    const classes = movieStyle();

    useEffect(() => {
        setMovie(props.movie);
        if(props.movie.urlPoster !== undefined && checkURL(props.movie.urlPoster)){
          setPoster(movie.urlPoster);
          setAltPoster(`${movie.title}'s poster`);
        }
    });

    const checkURL = url => {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    return (
        <li className={classes.li}>
            <div className={classes.inner}>
                <div className={classes.background}>
                  <img src={poster} alt={altPoster} className={classes.image}/>
                </div>
                <div className={classes.content}>
                    <h3>{movie.title}</h3>
                    <p>Category : {movie.category}</p>
                    <NavLink to={`/movie/${movie._id}`} className={classes.link}>Show more</NavLink>
                </div>
            </div>
        </li>
    );


};

export default Movie;