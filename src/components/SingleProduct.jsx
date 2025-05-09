import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useLocation, useNavigate } from "react-router-dom";

export default function SingleProduct({
  image,
  title,
  description,
  price,
  rate,
  id,
  buttons,
  favorite,
  addCartButton,
  removeFavorite,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  function singleProductHandler(evt) {
    evt.stopPropagation();
    if (!id) return;
    if (location.pathname === `/products/${id}`) return;

    navigate(`/products/${id}`);
  }

  return (
    <>
      <Card
        onClick={singleProductHandler}
        className="cursor-pointer"
        sx={{
          maxWidth: 370,
          minHeight:420,
          border: "2px solid #47126b",
          marginTop: "10px",
          position: "relative",
        }}
      >
        <div>{favorite}</div>
        <div>{removeFavorite}</div>

        <img
          src={image}
          className="aspect-square object-contain w-full "
        />
        <CardContent>
          <Typography gutterBottom variant="p" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
          <div className="mt-[1.5rem] flex justify-between">
            <h6>
              <span className="font-bold">$</span>
              {price}
            </h6>

            {addCartButton}
            <div className="flex">
              <StarRateIcon
                fontSize="small"
                sx={{ color: "#47126b" }}
              ></StarRateIcon>
              <p>{rate}</p>
            </div>
          </div>
        </CardContent>

        <CardActions className="flex justify-center">{buttons}</CardActions>
      </Card>
    </>
  );
}
