import axios from './';

export const addStaff = async (params = {}) => {
  try {
    const { data } = await axios.post('/staffs', params);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const getStaffs = async (params = {}) => {
  try {
    const { data } = await axios.get('/staffs');
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const getStaffById = async (id = {}) => {
  try {
    const { data } = await axios.get(`/staffs/${id}`);
    return data;
  } catch (e) {
    return e.response.data;
  }
};

export const SearchStaffs = async (searchTerm) => {
  try {
    const { data } = await axios.get(`/staffs?q=${searchTerm}`);
    return data;
  } catch (e) {
    return e.response.data;
  }
};