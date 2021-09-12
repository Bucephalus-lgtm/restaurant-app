import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
    ? 'api/restaurants'
    : 'http://localhost:5000/api/restaurants';

export default axios.create({
    baseURL
});