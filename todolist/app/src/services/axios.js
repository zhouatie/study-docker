import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
    timeout: 30000
});
instance.interceptors.response.use((res) => {
    if (res.data.code === 0) return res.data.data;
    else return Promise.reject('请求错误');
})
export default instance;