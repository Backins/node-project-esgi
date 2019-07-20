import React,{useState} from 'react';
import { SearchStaffs } from '../../api/staff';
const Search = () => {
  const [searchTerm,setSearchTerm] = useState('');
  const [displayStaff,setDisplayStaff] = useState(false);
  const [staffs,setStaffs] = useState([]);

  const submitSearch = () => {
    SearchStaffs(searchTerm).then(res => setStaffs(res));
  };

  return <>
    <h1>Search</h1>
    <div>
      <input value={searchTerm} type="text" onChange={e => setSearchTerm(e.target.value)}/>
      <button onClick={submitSearch}>🔍</button>
    </div>

    <div>
      <span onClick={() => setDisplayStaff(false)}>Movie</span>
      <span onClick={() => setDisplayStaff(true)}>Staffs</span>
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
          Display Movies
        </div>
    }

  </> ;
};

export default Search;