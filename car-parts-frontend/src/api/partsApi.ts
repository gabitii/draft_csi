import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/parts'});

export const getParts = () => API.get('');
export const createPart = (data:any) => API.post('/', data);
export const deletePart = (id: string) => API.delete('${id}');
