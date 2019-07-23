import React, { useState, useEffect, useRef } from 'react'
import { getMovieById } from '../../api/movie';
import { getStaffById } from '../../api/staff';
import { makeStyles } from '@material-ui/core/styles';
import validUrl from 'valid-url'; 

const movieByIdStyle = makeStyles(theme => ({
  bgImg: {
    width: '100%',
    textAlign: 'center'
  },
}))

const ViewMovie = props => {
  const [poster, setPoster] = useState('https://www.tellerreport.com/images/no-image.png')
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState([]);
  const [realisator, setRealisator] = useState([]);
  const ref = useRef({ mounted: false });

  const classes = movieByIdStyle()

  useEffect(() => {
    const idMovie = props.match.params.id;
    if (!ref.current.mounted) {
      getMovieById(idMovie).then(response => {
        const movie = response;
        setMovie(movie);
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
        if(movie.urlPoster !== undefined && validUrl.isHttpUri(movie.urlPoster)){
          setPoster(movie.urlPoster);
        }
      })
      ref.current = { mounted: true }
    }
  })

  return (
    <div>
      {actors.map(actor => <div>{actor.firstname + ' ' + actor.lastname}</div>)}
    </div>
  )
}

export default ViewMovie
