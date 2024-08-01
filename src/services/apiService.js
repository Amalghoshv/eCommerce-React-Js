import axios from 'axios';

const apiClient = axios.create({
    baseURL:'https://fakestoreapi.com',
    timeout:10000
});
export  const fetchProducts = async () =>{
    try{
        const response = await apiClient.get('/products');
        return response.data;
    }catch(error){
        throw new error(error.response?.data?.message || 'Failed to fetch Producs')

    }
}
