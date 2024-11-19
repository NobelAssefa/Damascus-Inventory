import axios from "axios";
import {jwtDecode} from "jwt-decode"
import dayjs from "dayjs"

const  baseURL='http://localhost:5000/api';

// const apiHelper = axios.create({
//     baseURL,
//     headers:{
//         "Content-Type":"application/json"
//     }
// })

let authTokens = localStorage.getItem("authTokens") 
                ? JSON.parse(localStorage.getItem("authTokens")): null;

const axiosInstance = axios.create({
    baseURL,
    headers:{ Authorizaion: `Bearer ${authTokens?.access}`},
})

axiosInstance.interceptors.request.use(async(req)=>{
    if(!authTokens){
        authTokens = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
    }

    if(authTokens){
        const user = jwtDecode(authTokens?.access)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if(!isExpired) return req;

        const response = await axios.post(`${baseURL}/token/refresh`,{
            refresh: authTokens?.refresh,
        });

        localStorage.setItem("authTokens", JSON.stringify(response.data));
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    }
    return req;
});
export default axiosInstance;