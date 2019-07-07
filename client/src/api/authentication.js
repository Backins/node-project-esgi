import axios from './';

export const login = async (params = {}) => {
  try {
    const { data } = await axios.post('/login_check', params);
    return data;
  } catch (e) {
    return e;
  }
};

export const register = async (params = {}) => {
  try {
    const { data } = await axios.post('/register', params);
    return data;
  } catch (e) {
    return e;
  }
};