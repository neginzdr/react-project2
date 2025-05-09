import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useGetShoppingProducts(shoppingProductsId) {
  //   async function queryFn() {
  //     return await shoppingProductsId?.map((id) =>
  //       api.get(`products/${id}`)
  //     );
  //   }

  async function queryFn() {
    const req = await Promise.all(
      shoppingProductsId.map((id) => api.get(`products/${id}`))
    );
    return req;
  }

  return useQuery({
    queryFn,
    queryKey: [`shoppingProduct@${shoppingProductsId}`],
  });
}
