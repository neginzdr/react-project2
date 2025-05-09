import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import useCart from "../store/useCart";

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { products } = useCart();


  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  function homeHandeler() {
    navigate("/");
  }

  function shoppingHandeler() {
    navigate("/shopping");
  }

  function favoriteHandler(){
    navigate("/favorite");
  }

  return (
    <>
      <Box sx={{ width: "100%", position: "fixed", bottom: "0" }}>
        <BottomNavigation
          sx={{ backgroundColor: "#dec9e9" }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={homeHandeler}
            icon={<HomeIcon fontSize="medium" sx={{ color: "#47126b" }} />}
          />
          <BottomNavigationAction
          onClick={favoriteHandler}
            icon={<FavoriteIcon fontSize="medium" sx={{ color: "#47126b" }} />}
          />
          <BottomNavigationAction
          onClick={shoppingHandeler}
            icon={
              <StyledBadge
                badgeContent={products?.length || 0}
                color="secondary"
              >
                <ShoppingCartIcon sx={{ color: "#47126b" }} />
              </StyledBadge>
            }
          />
        </BottomNavigation>
      </Box>
    </>
  );
}
