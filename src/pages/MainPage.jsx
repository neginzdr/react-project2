import { useContext, useState } from "react";
import SingleProduct from "../components/SingleProduct";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useGetProducts from "../requests/useGetProducts";
import { SearchContext } from "../App";
import { Button, Stack } from "@mui/material";
import { purple } from "@mui/material/colors";
import MyBreadCrumbs from "../components/MyBreadcrumbs";
import Modals from "../components/Modal";

export default function MainPage() {
  const { data: products, isLoading, isError, error } = useGetProducts();
  const { searchItems, setSearchItems } = useContext(SearchContext);
  const [selectCategoty, setSelectCategory] = useState("All");


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

  function handleCategory(evt) {
    const category = evt.target.getAttribute("data-category");
    setSelectCategory(category);
  }

  const filterProducts =
    selectCategoty === "All"
      ? products?.data
      : products?.data?.filter((item) => item.category === selectCategoty);



  return (
    <>
      <div className="ml-[2rem] mt-[1rem] mb-[1.5rem]">
        <MyBreadCrumbs />
      </div>
      <div className="flex flex-wrap gap-4 md:flex-row flex-col items-start mt-[1rem] ml-[2rem]">
        {[
        "All",
        "men's clothing",
        "women's clothing",
        "jewelery",
        "electronics",
      ].map((category) => (
        <Button
          data-category={category}
          onClick={handleCategory}
          key={category}
          variant="contained"
          sx={{
            backgroundColor: "#c77dff",
            color: "#10002b",
            minWidth: "150px",
            "&:hover": {
              backgroundColor: purple[700],
              color: "white",
            },
          }}
        >
          {category.charAt(0).toUpperCase()+category.slice(1)}
        </Button>
      ))}
      </div>
      
      <div className="grid grid-cls-1 sm:grid-cols-2 md:grid-cols-4 gap-10 m-[2rem]">
        {searchItems.length == 0
          ? filterProducts?.map((item) => (
              <SingleProduct
                image={item.image}
                title={item.title}
                price={item.price}
                rate={item.rating.rate}
                key={item.id}
                id={item.id}
              />
            ))
          : searchItems?.map((item) => (
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
    </>
  );
}
