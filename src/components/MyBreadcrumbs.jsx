import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";

export default function MyBreadcrumbs() {
  const location = useLocation();

  const fullPathnames = location.pathname.split("/").filter(Boolean);

  const displayPathnames = fullPathnames.filter((part) => part !== "products");

  if (displayPathnames.length === 0) {
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Typography color="text.primary">Main Page</Typography>
      </Breadcrumbs>
    );
  }

  let currentPathIndex = 0;

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Link component={RouterLink} to="/" underline="hover" color="inherit">
        Main Page
      </Link>

      {displayPathnames.map((segment, index) => {
        currentPathIndex = fullPathnames.indexOf(segment, currentPathIndex);
        const to = "/" + fullPathnames.slice(0, currentPathIndex + 1).join("/");
        currentPathIndex += 1;

        const isLast = index === displayPathnames.length - 1;

        return isLast ? (
          <Typography key={to} color="text.primary">
            {decodeURIComponent(segment)}
          </Typography>
        ) : (
          <Link
            key={to}
            component={RouterLink}
            to={to}
            underline="hover"
            color="inherit"
          >
            {decodeURIComponent(segment)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}


