import axios from "axios";

const api=axios.create({
    baseURL:"https://fakestoreapi.com/",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    }
})


api.interceptors.request.use(req=>req);
api.interceptors.response.use(res=>res);


export default api;