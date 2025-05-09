import { Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[300px] gap-4 text-center bg-white-100 p-8">
      <ShoppingCartIcon sx={{ fontSize: 60, color: "#dec9e9" }} />
      <Typography variant="h6">Your cart is empty</Typography>
      <Typography variant="body2" color="text.secondary">
        Looks like you haven’t added anything yet.
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
        sx={{ backgroundColor: "#47126b", color: "white" }}
      >
        Continue Shopping
      </Button>
    </div>
  );
};

export default EmptyCart;
