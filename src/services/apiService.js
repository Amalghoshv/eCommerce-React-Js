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
const fetchMensProducts = async () =>{
    try{
        const response = await apiClient.get("/products/category/men's clothing");
        return response.data;
    }catch(error){
        throw new error(error.response?.data?.message || 'Failed to fetch Producs')

    }
}
const fetchWomensProducts = async () =>{
    try{
        const response = await apiClient.get("/products/category/women's clothing");
        return response.data;
    }catch(error){
        throw new error(error.response?.data?.message || 'Failed to fetch Producs')

    }
}
const fetchJewelleryProducts = async () =>{
    try{
        const response = await apiClient.get("/products/category/jewelery");
        return response.data;
    }catch(error){
        throw new error(error.response?.data?.message || 'Failed to fetch Producs')

    }
}
const fetchElectronicsProducts = async () =>{
    try{
        const response = await apiClient.get("/products/category/electronics");
        return response.data;
    }catch(error){
        throw new error(error.response?.data?.message || 'Failed to fetch Producs')

    }
}
export {fetchMensProducts, fetchWomensProducts,fetchJewelleryProducts,fetchElectronicsProducts}