import { Box, Button, CircularProgress } from "@mui/material";
import SingleProduct from "../components/SingleProduct";
import useGetShoppingProducts from "../requests/useGetShoppingProducts";
import useCart from "../store/useCart";
import { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EmptyCart from "../components/EmptyCart";
import MyBreadCrumbs from "../components/MyBreadcrumbs";
import Modals from "../components/Modal";

export default function ShoppingCartPage() {
  const {
    products,
    addProduct,
    decreaseProduct,
    removeProduct,
    increaseProduct,
  } = useCart();

  const shoppingProductsId = products.map((item) => item.id);

  const { data, isLoading, isError, error } =
    useGetShoppingProducts(shoppingProductsId);

  const mergedProducts = useMemo(() => {
    return data?.map((apiProduct) => {
      const productData = apiProduct.data;
      const cartItem = products.find(
        (p) => p.id === productData?.id?.toString()
      );
      return {
        ...productData,
        quantity: cartItem?.quantity || 0,
      };
    });
  }, [data, products]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="secondary" size="5rem" />
      </Box>
    );
  }

  if (isError) {
    return <Modals errorMessage={error?.message} />;
  }

  return (
    <>
      <div className="ml-[2rem]">
        <MyBreadCrumbs />
      </div>

      {mergedProducts.length === 0 ? (
        <div 
        // className="flex justify-center items-center h-[80vh] w-full"
        >
          <EmptyCart />
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 m-[2rem]"
          // className="grid grid-cols-3 gap-10 m-[3rem]"
        >
          {mergedProducts.map((item) => (
            <SingleProduct
              image={item?.image}
              title={item?.title}
              price={item?.price}
              rate={item?.rating?.rate}
              key={item?.id}
              // key={`${item.id}-${products.find(
              //   (p) => p.id === item.id.toString()?.quantity
              // )}`}

              buttons={
                <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Button
                      size="large"
                      sx={{
                        backgroundColor: "#47126b",
                        color: "white",
                        minWidth: "40px",
                        height: "30px",
                        borderRadius: "10px",
                      }}
                      onClick={(evt) =>
                        increaseProduct(item.id.toString(), evt)
                      }
                    >
                      +
                    </Button>

                    <span className="text-sm font-semibold px-2">
                      {item.quantity}
                    </span>

                    <Button
                      size="large"
                      sx={{
                        backgroundColor: "#47126b",
                        color: "white",
                        minWidth: "40px",
                        height: "30px",
                        borderRadius: "10px",
                      }}
                      onClick={(evt) =>
                        decreaseProduct(item.id.toString(), evt)
                      }
                    >
                      -
                    </Button>
                  </div>

                  <Button
                    onClick={(evt) => removeProduct(item.id.toString(), evt)}
                    sx={{ minWidth: "30px", height: "30px" }}
                  >
                    <DeleteIcon fontSize="large" sx={{ color: "#47126b" }} />
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </>
  );
}
