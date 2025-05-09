import { Box, CircularProgress, IconButton } from "@mui/material";
import MyBreadcrumbs from "../components/MyBreadcrumbs";
import NoFavorites from "../components/noFavorites";
import SingleProduct from "../components/SingleProduct";
import useGetFavoriteCart from "../requests/useGetFavoriteCart";
import useFavoriteCart from "../store/useFavoriteCart";
import Modals from "../components/Modal";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function FavoritePage() {
  const { favoriteCarts, remove } = useFavoriteCart();

  const { data, isError, isLoading, error } = useGetFavoriteCart(favoriteCarts);

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
    <>
      <div>
        <MyBreadcrumbs />
      </div>

      {data?.length === 0 ? (
        <div className="flex justify-center items-center h-[80vh] w-full">
          <NoFavorites />
        </div>
      ) : (
        <div className="grid grid-cls-1 sm:grid-cols-2 md:grid-cols-4 gap-10 m-[2rem]">
          {data?.map((item) => (
            <SingleProduct
              image={item?.data?.image}
              title={item?.data?.title}
              price={item?.data?.price}
              rate={item?.data?.rating?.rate}
              key={`@${item?.data?.id}`}
              removeFavorite={
                <IconButton
                  onClick={() => {
                    remove(item?.data?.id.toString());
                  }}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    cursor: "pointer",
                    color: "#47126b",
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
