// config/apiCalls/productApiCalls.js
import apiHelper from '../api/apiHelper';
import axiosInstance from '../api/apiHelper';
let api = axiosInstance;
export const getAllProducts = async () => {
    try {
        const response = await api.get('/products/getall');
     
        return response.data.product;
    } catch (error) {
        throw new Error('Error fetching products');
    }
};


export const createProducts = async (productData)=>{
    try{
        const response = await apiHelper.post('/products', productData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          return response.data;

    }catch(error){
        throw new Error('Error while creating prodcut')
    }
}