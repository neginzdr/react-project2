import { useEffect, useState } from "react";
import SingleProduct from "../components/SingleProduct";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useGetProducts from "../requests/useGetProducts";

export default function MainPage() {
  const { data: products, isLoading, isError, error } = useGetProducts();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="secondary" size="3rem" />
      </Box>
    );
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="grid grid-cols-3 gap-10 m-[3rem]">
      {products?.data?.map((item) => (
        <SingleProduct
          image={item.image}
          title={item.title}
          price={item.price}
          rate={item.rating.rate}
          key={item.id}
          id={item.id}
        />
      ))}
    </div>
  );
}
