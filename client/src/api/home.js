import axios from './';

export const getHomeMovies = async params => {
  try {
    const { data } = await axios.get('/movies/home');
    return data;
  } catch (e) {
    return e.response.data;
  }
};