import axios from 'axios';
const API_URL = 'http://localhost:3001/products'; // json-server endpoint

export const fetchProducts = () => axios.get(API_URL);
export const addProduct = (product) => axios.post(API_URL, product);

//npx json-server --watch db.json --port 3001
// 'https://json-api-tp49.onrender.com'