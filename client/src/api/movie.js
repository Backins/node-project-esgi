import axios from './';

export const addMovie = async (params = {}) => {
  try {
    const { data } = await axios.post('/staffs', params);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const getMovies = async (params = {}) => {
  try {
    const { data } = await axios.get('/staffs');
    return data;
  } catch (e) {
    return e.response.data;
  }
};