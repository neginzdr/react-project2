import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useGetFavoriteCart(favoriteCartsId){

    async function queryFn() {
        const req = await Promise.all(
          favoriteCartsId.map((item) => api.get(`products/${item.id}`))
        );
        return req;
      }
    
      return useQuery({
        queryFn,
        queryKey: [`favoriteCartsId@${favoriteCartsId}`],
      });
}