import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useGetSingleProduct(cartId){

    async function queryFn() {
        return await api.get(`products/${cartId}`)
        
    }
    
    return useQuery({
        queryFn,
        queryKey:[`singleProduct${cartId}`]
    })
}