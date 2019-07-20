import React,{useState} from 'react';
import { SearchStaffs } from '../../api/staff';
import { SearchMovies } from '../../api/movie';

const Search = () => {
  const [searchTerm,setSearchTerm] = useState('');
  const [displayStaff,setDisplayStaff] = useState(true);
  const [displayMovie, setDisplayMovie] = useState(true);
  const [staffs,setStaffs] = useState([]);
  const [movies,setMovies] = useState([]);

  const submitSearch = () => {
    SearchStaffs(searchTerm).then(res => setStaffs(res));
    SearchMovies(searchTerm).then(res => setMovies(res));
  };

  return <>
    <h1>Search</h1>
    <div>
      <input value={searchTerm} type="text" onChange={e => setSearchTerm(e.target.value)}/>
      <button onClick={submitSearch}>🔍</button>
    </div>

    <div>
      <span onClick={() => setDisplayStaff(!displayStaff)}><strong>Staffs</strong></span>
    </div>
    {
      displayStaff ?
        <div>
        {
          staffs.map(staff =>
            <div key={Math.random()}>
              <div>
                <label>Fistname :</label>
                <span>{staff.firstname}</span>
              </div>
              <div>
                <label>Lastname :</label>
                <span>{staff.lastname}</span>
              </div>
              <div>
                <label>Nationality :</label>
                <span>{staff.nationality ? staff.nationality :'' }</span>
              </div>
              <div>
                <label>Biography :</label>
                <span>{staff.biography ? staff.biography :'' }</span>
              </div>
              <div>
                <label>Birthday :</label>
                <span>{staff.birthday ? staff.birthday :'' }</span>
              </div>
            </div>
          )
        }
        </div> :
        <div>
        </div>
    }
    <div>
    <span onClick={() => setDisplayMovie(!displayMovie)}><strong>Movie</strong></span>
    </div>
        { displayMovie ? 
          <div>
          {
            movies.map(movie =>
              <div key={Math.random()}>
                <div>
                  <label>Titre :</label>
                  <span>{movie.title}</span>
                </div>
                <div>
                  <label>Année :</label>
                  <span>{movie.year}</span>
                </div>
                <div>
                  <label>Catégorie :</label>
                  <span>{movie.category}</span>
                </div>
                <div>
                  <label>Réalisateur :</label>
                  <span>{movie.realisator}</span>
                </div>
                <div>
                  <label>Acteurs :</label>
                  <ul>
                  { movie.actors.map(actor => 
                      <li key={Math.random()}>{actor}</li>
                   )}
                    </ul>
                </div>
              </div>
            )
          }
          </div> :
          <div></div>
        }
  </> ;
};

export default Search;