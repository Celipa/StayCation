import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/cities';

const getAll = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export default {
  getAll,
};