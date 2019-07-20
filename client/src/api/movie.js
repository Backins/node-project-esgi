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