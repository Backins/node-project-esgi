import axios from './';

export const addMovie = async (params = {}) => {
  try {
    const { data } = await axios.post('/movies', params);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const getMovies = async (params = {}) => {
  try {
    const { data } = await axios.get('/movies');
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const getMovieById = async (params = {}) => {
  try {
    const { data } = await axios.get('/movie/:id');
    console.log("ok");
    console.log(data);
    return data;
  } catch (e) {
    console.log("ko");
    console.log(e.response.data);
    return e.response.data;
  }
};

export const SearchMovies = async (searchTerm) => {
  try {
    const { data } = await axios.get(`/movies?q=${searchTerm}`);
    return data;
  } catch (e) {
    return e.response.data;
  }
};