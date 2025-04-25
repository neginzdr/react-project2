import { useParams } from "react-router-dom";
import useGetSingleProduct from "../requests/useGetSingleProduct";
import SingleProduct from "../components/SingleProduct";
import { Box, Button, CircularProgress } from "@mui/material";
import useCart from "../store/useCart";
import { useMemo } from "react";

export default function SingleCartPage() {
  const { cartId } = useParams();
  const {
    data: singleCart,
    isLoading,
    isError,
    error,
  } = useGetSingleProduct(cartId);

  const { products, addProduct, decreaseProduct } = useCart();

  const thisProductCount = useMemo(() => {
    const founIndex = products.findIndex((item) => item.id === cartId);

    if (founIndex == -1) {
      return 0;
    } else {
      return products[founIndex].quantity;
    }
  }, [products]);

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

  console.log(singleCart.data);

  return (
    <div className="flex justify-center items-center">
      <SingleProduct
        image={singleCart?.data?.image}
        title={singleCart?.data?.title}
        price={singleCart?.data?.price}
        rate={singleCart?.data?.rating?.rate}
        description={singleCart?.data?.description}
        key={singleCart?.data?.id}
        buttons={
          <>
            <Button
              size="small"
              sx={{
                backgroundColor: "#47126b",
                color: "white",
                height: "30px",
                borderRadius: "10px",
              }}
              onClick={(evt) => addProduct(cartId, evt)}
            >
              +
            </Button>
            <span>{thisProductCount}</span>
            <Button
              size="small"
              sx={{
                backgroundColor: "#47126b",
                color: "white",
                height: "30px",
                borderRadius: "10px",
              }}
              onClick={(evt) => decreaseProduct(cartId, evt)}
            >
              -
            </Button>
          </>
        }
      />
    </div>
  );
}
