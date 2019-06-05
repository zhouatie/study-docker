import api from './axios.js'

export const apiGetList = () => api.get('/getList');
export const apiCheck = (params) => api.put('/check', params);
export const apiInsert = (params) => api.post('/insert', params);
export const apiDelete = (params) => api.post('/delete', params);