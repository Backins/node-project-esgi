import React, { useState, useEffect, useRef } from 'react'
import { getMovieById } from '../../api/movie'
import { makeStyles } from '@material-ui/core/styles'

const movieByIdStyle = makeStyles(theme => ({
  bgImg: {
    width: '100%',
    textAlign: 'center'
  },

  alignText: {
    textAlign: 'center'
  },

  elemItems: {
    margin: '20px 0',
  },

  strong: {
    color: '#f1c40f'
  }
}))

const ViewMovie = props => {
  const [title, setTitle] = useState('Undefined')
  const [year, setYear] = useState('Undefined')
  const [category, setCategory] = useState('Undefined')
  const [actors, setActors] = useState('Undefined')
  const [realisator, setRealisator] = useState('Undefined')
  const [img, setImg] = useState('https://www.tellerreport.com/images/no-image.png')
  const [staffs, setStaffs] = useState([])
  const [movieById, setMovieById] = useState({})
  const ref = useRef({ mounted: false })

  const classes = movieByIdStyle()

  useEffect(() => {
    const idMovie = props.match.params.id;
    if (!ref.current.mounted) {
      getMovieById(idMovie).then(response => {
        setMovieById(response)
        console.log(response)
      })
      ref.current = { mounted: true }
    }
  })

  return (
    <div>
      <div className={classes.bgImg}>
        <img src={img} alt="imageFilm" width="100" height="100"/>
      </div>
      <div className={classes.alignText}>
        <div className={classes.elemItems}>
          <h1>{title}</h1>
        </div>
        <div className={classes.elemItems}>
          <p>
            <strong className={classes.strong}>Année de sortie:</strong>{' '}
          </p>
          <span>{year}</span>
        </div>
        <div className={classes.elemItems}>
          <p>
            <strong className={classes.strong}>Catégorie: </strong>
          </p>
          <span>{category}</span>
        </div>
        <div className={classes.elemItems}>
          <p>
            <strong className={classes.strong}>Acteurs principaux: </strong>
          </p>
          <span>{actors}</span>
        </div>
        <div className={classes.elemItems}>
          <p>
            <strong className={classes.strong}>Réalisateur: </strong>
          </p>
          <span>{realisator}</span>
        </div>
        <div className={classes.elemItems}>
          <p>
            <strong className={classes.strong}>Staff: </strong>
          </p>
          <span>{staffs.length === 0 ? "Undefined" : staffs }</span>
        </div>
      </div>
    </div>
  )
}

export default ViewMovie
