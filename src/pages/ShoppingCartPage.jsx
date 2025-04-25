import { Box, Button, CircularProgress } from "@mui/material";
import SingleProduct from "../components/SingleProduct";
import useGetShoppingProducts from "../requests/useGetShoppingProducts";
import useCart from "../store/useCart";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ShoppingCartPage() {
  const { products, addProduct, decreaseProduct, removeProduct } = useCart();
  const shoppingProductsId = products.map((item) => item.id);
  const uniqeIds = useMemo(() => {
    return [...new Set(shoppingProductsId)];
  }, []);

  console.log(products);
  const { data, isLoading, isError, error } = useGetShoppingProducts(uniqeIds);

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
      {data?.map((item) => (
        <SingleProduct
          image={item?.data?.image}
          title={item?.data?.title}
          price={item?.data?.price}
          rate={item?.data?.rating.rate}
          buttons={
            <div className="flex justify-between">
              <Button
                size="small"
                sx={{
                  backgroundColor: "#47126b",
                  color: "white",
                  height: "30px",
                  borderRadius: "10px",
                }}
                onClick={(evt) => addProduct(item.data.id.toString(), evt)}
              >
                +
              </Button>
              <span> 0 </span>
              <Button
                size="small"
                sx={{
                  backgroundColor: "#47126b",
                  color: "white",
                  height: "30px",
                  borderRadius: "10px",
                }}
                onClick={(evt) => decreaseProduct(item.data.id.toString(), evt)}
              >
                -
              </Button>

              <Button
                onClick={(evt) => removeProduct(item.data.id.toString(), evt)}
              >
                <DeleteIcon fontSize="medium" sx={{ color: "#47126b" }} />
              </Button>
            </div>
          }
        />
      ))}
    </div>
  );
}
