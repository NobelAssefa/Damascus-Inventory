import apiHelper from '../api/apiHelper';
import axiosInstance from "../api/apiHelper"
let api = axiosInstance;
export const login_user = async (email, password) =>{
    try{
        const response = await api.post('users/login', {
            email:email,
            password:password,
        });
        console.log("response..." + response);
        
        return {success:true, data:response.data}
        }catch(err)
        {
            if(err.response){
                console.log("unable to login");
                return {success:false, data:null, error:err.response.data.message}
            }else{
                console.log(`Error: ${err.message}`);
                
            }

        }

    }
