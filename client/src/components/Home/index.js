import React,{useState, useEffect,useRef} from 'react';
import { getHomeMovies } from '../../api/home';

import { moviesStyle } from '../Movies/index';
import Movie from '../Movie';
const Home = () => {
  const [movies,setMovies] = useState([]);
  const classesMovie = moviesStyle();
  const mounted = useRef(false)

    useEffect(() => {
        if(!mounted.current){
            getHomeMovies().then(res => setMovies(res));
            mounted.current = true;
        }
       
    })

  return <>
    {
            <main className={classesMovie.main}>
              <section className={classesMovie.container}>
                <h1 className={classesMovie.title}>Movies list</h1>
                <ul className={classesMovie.list}>
                  {movies.map(movie => <Movie movie={movie}/>)}
                </ul>
              </section>
            </main>
          }
          </>
};

export default Home;