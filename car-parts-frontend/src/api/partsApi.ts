import axios from 'axios';

export const API_URL = 'http://localhost:3000/parts';
const API = axios.create({ baseURL: API_URL });

export const getParts = () => API.get('');
export const createPart = (data:any) => API.post('/', data);
export const deletePart = (id: string) => API.delete(`/${id}`);
export const clearAll = () => API.delete('/clear');