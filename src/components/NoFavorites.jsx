import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function NoFavorites() {
  return (
    <div className="flex flex-col items-center justify-center h-[300px] gap-4 text-center bg-white-100 p-8">
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <FavoriteBorderIcon sx={{ fontSize: 48, color: "#dec9e9" }} />
        <Typography variant="h6" fontWeight="bold">
          No favorite products found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You haven't added any products to your favorites list yet.
        </Typography>
      </Box>
    </div>
  );
}
