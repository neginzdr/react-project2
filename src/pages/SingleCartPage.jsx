import { useParams } from "react-router-dom";
import useGetSingleProduct from "../requests/useGetSingleProduct";
import SingleProduct from "../components/SingleProduct";
import { Box, CircularProgress, IconButton } from "@mui/material";
import useCart from "../store/useCart";
import { useMemo } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Modals from "../components/Modal";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MyBreadcrumbs from "../components/MyBreadcrumbs";
import useFavoriteCart from "../store/useFavoriteCart";

export default function SingleCartPage() {
  const { cartId } = useParams();
  const {
    data: singleCart,
    isLoading,
    isError,
    error,
  } = useGetSingleProduct(cartId);

  const { products, addProduct } = useCart();
  const { favoriteCarts, addToFavorite } = useFavoriteCart();

  // const thisProductCount = useMemo(() => {
  //   const founIndex = products.findIndex((item) => item.id === cartId);
  //   if (founIndex == -1) {
  //     return 0;
  //   } else {
  //     return products[founIndex].quantity;
  //   }
  // }, [products]);

  const isAlreadyFavorite = useMemo(() => {
    return favoriteCarts.some((item) => item.id === cartId);
  }, [favoriteCarts, cartId]);

  const isAlreadyAddToCart = useMemo(() => {
    return products.some((item) => item.id === cartId);
  }, [products, cartId]);

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
    return <Modals errorMessage={error?.message} />;
  }

  return (
    <div className="w-screen overflow-x-hidden">
      <div className="ml-[2rem]">
        <MyBreadcrumbs />
      </div>
      <div className="w-full overflow-x-hidden px-4 py-6 flex justify-center ">
        <div className="max-w-[400px]">
          <SingleProduct
          image={singleCart?.data?.image}
          title={singleCart?.data?.title}
          price={singleCart?.data?.price}
          rate={singleCart?.data?.rating?.rate}
          description={singleCart?.data?.description}
          key={singleCart?.data?.id}
          addCartButton={
            <IconButton
              sx={{ color: "#47126b" }}
              aria-label="add to shopping cart"
              onClick={(evt) => {
                addProduct(cartId, evt);
              }}
            >
              <AddShoppingCartIcon
                fontSize="large"
                sx={{ color: isAlreadyAddToCart ? "#c77dff" : "#47126b" }}
              />
            </IconButton>
          }
          favorite={
            <IconButton
              onClick={() => {
                addToFavorite(cartId);
              }}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
                color: "#47126b",
              }}
            >
              {isAlreadyFavorite ? (
                <FavoriteIcon fontSize="medium" />
              ) : (
                <FavoriteBorderIcon fontSize="medium" />
              )}
            </IconButton>
          }
        />
     
        </div>
        
      </div>
      
    </div>
  );
}
