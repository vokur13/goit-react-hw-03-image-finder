import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '29248542-cea93977a5234fa0e2d1b3dfd';
// const API_KEY = '248542-cea93977a5234fa0e2d1b3dfd';

export const getGallery = async (query, page) => {
  const response = await axios.get(
    `/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

// const url = `https://pixabay.com/api/?q=london&page=1&key=29248542-cea93977a5234fa0e2d1b3dfd&image_type=photo&orientation=horizontal&per_page=12`;
// return response.data.hits;
