import React,{useState} from 'react';
import { SearchStaffs } from '../../api/staff';
import { SearchMovies } from '../../api/movie';
import { moviesStyle } from '../Movies/index';
import Movie from '../Movie';
import BlockStaff from '../BlocStaff';
import { makeStyles } from '@material-ui/core/styles';

const searchStyle = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  searchComponent: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  inputSearch: {
    padding: '.3rem .3rem',
    fontSize: '1.2rem',
    outline: 'none',
    width: '30%',
    border: 'none',
    borderBottom: '1px solid #34495e',
    transition: 'border-bottom .3s ease, background-color .3s ease',
    outline: 'none',
    '&:hover, &:active, &:focus': {
      borderBottom: '1px solid #f1c40f',
      backgroundColor: 'rgba(0,0,0,0.01)',
    }
  },
  buttonSearch: {
    width: '3%'
  },
  resultatContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    backgroundColor: '#f1c40f',
  },
  resultatStaff: {
    fontSize: '1.5rem',
    color: '#000',
    fontWeight: '600',
    cursor: 'pointer',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    padding: '.3rem .5rem',
    transition: 'background-color .3s ease',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    }
  },
  resultatMovie: {
    fontSize: '1.5rem',
    color: '#000',
    fontWeight: '600', 
    marginLeft: '2rem',
    cursor: 'pointer',
    borderLeft: '1px solid #000',
    borderRight: '1px solid #000',
    padding: '.3rem .5rem',
    transition: 'background-color .3s ease',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    }
  },
  staffsList: {
    margin: '2rem 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  containerMovie: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

const Search = () => {
  const [searchTerm,setSearchTerm] = useState('');
  const [displayStaff,setDisplayStaff] = useState(true);
  const [displayMovie, setDisplayMovie] = useState(false);
  const [staffs,setStaffs] = useState([]);
  const [movies,setMovies] = useState([]);
  const classes = searchStyle();
  const classesMovie = moviesStyle();

  const submitSearch = e => {
    e.preventDefault();
    SearchStaffs(searchTerm).then(res => setStaffs(res));
    SearchMovies(searchTerm).then(res => setMovies(res));
  };

  return <>
    <h1 className={classes.title}>Search</h1>
    <div >
      <form className={classes.searchComponent} onSubmit={ e => submitSearch(e)}>
        <input className={classes.inputSearch} value={searchTerm} type="text" onChange={e => setSearchTerm(e.target.value)} placeholder="ex: Life and a Day"/>
        <button className= {classes.buttonSearch} onClick={ e => submitSearch(e)}><span role="img" aria-label="search">🔍</span></button>
      </form>
    </div>

    <div className={classes.resultatContainer}>
      <span className={classes.resultatStaff} onClick={() => setDisplayStaff(true)}><strong>Staffs</strong></span>
      <span className={classes.resultatMovie} onClick={() => {setDisplayStaff(false)}}><strong>Movie</strong></span>
    </div>
    {
      displayStaff ?
        <div className={classes.staffsList}>
        {
          staffs.map(staff => <BlockStaff  staff={staff} /> )

        }
        </div> :
        <div>
        </div>
    }
    <div>
    </div>
        { !displayStaff ? 
          <div>
          {
            <main className={classesMovie.main}>
              <section className={classesMovie.container}>
                <h1 className={classesMovie.title}>Movie Gallery</h1>
                <ul className={classesMovie.list}>
                  {movies.map(movie => <Movie movie={movie}/>)}
                </ul>
              </section>
            </main>
          }
          </div> :
          <div></div>
        }
  </> ;
};

export default Search;