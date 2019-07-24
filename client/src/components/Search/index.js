import React,{useState} from 'react';
import { SearchStaffs } from '../../api/staff';
import { SearchMovies } from '../../api/movie';
import { moviesStyle } from '../Movies/index';
import Movie from '../Movie';
import BlockStaff from '../BlocStaff';

const Search = () => {
  const [searchTerm,setSearchTerm] = useState('');
  const [displayStaff,setDisplayStaff] = useState(true);
  const [displayMovie, setDisplayMovie] = useState(false);
  const [staffs,setStaffs] = useState([]);
  const [movies,setMovies] = useState([]);
  const classes = moviesStyle();

  const submitSearch = () => {
    SearchStaffs(searchTerm).then(res => setStaffs(res));
    SearchMovies(searchTerm).then(res => setMovies(res));
  };

  return <>
    <h1>Search</h1>
    <div>
      <input value={searchTerm} type="text" onChange={e => setSearchTerm(e.target.value)}/>
      <button onClick={submitSearch}><span role="img" aria-label="search">🔍</span></button>
    </div>

    <div>
      <span onClick={() => setDisplayStaff(true)}><strong>Staffs</strong></span>
      <span onClick={() => {setDisplayStaff(false)}}><strong>Movie</strong></span>
    </div>
    {
      displayStaff ?
        <div>
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
            <main className={classes.main}>
              <section className={classes.container}>
                <h1 className={classes.title}>Movie Gallery</h1>
                <ul className={classes.list}>
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