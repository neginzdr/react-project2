import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export default function useGetProducts() {
  async function queryFn() {
    const result = await api.get("products");
    return result;
  }

  return useQuery({
    queryFn,
    queryKey: ["ALL_PRODUCTS"],
    retry: 1,
  });
}
