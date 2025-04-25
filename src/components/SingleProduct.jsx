import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useNavigate } from "react-router-dom";

export default function SingleProduct({
  image,
  title,
  description,
  price,
  rate,
  id,
  buttons,
}) {
  const navigate = useNavigate();

  function singleProductHandler() {
    navigate(`/products/${id}`);
  }

  return (
    <>
      <Card
        onClick={singleProductHandler}
        className="cursor-pointer"
        sx={{ maxWidth: 370, border: "2px solid #47126b", marginTop: "10px" }}
      >
        <img
          src={image}
          className="w-full  object-contain h-[10rem] m-[1rem]"
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

            <div className="flex">
              <StarRateIcon
                fontSize="small"
                sx={{ color: "#47126b" }}
              ></StarRateIcon>
              <p>{rate}</p>
            </div>
          </div>
        </CardContent>

        <CardActions className="flex justify-center ">
          {buttons}
        </CardActions>
      </Card>
    </>
  );
}
