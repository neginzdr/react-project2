import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import useGetProducts from "../requests/useGetProducts";
import { useContext, useRef } from "react";
import { SearchContext } from "../App";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header({ buttonDarkMode }) {
  const { data } = useGetProducts();
  const { searchItems, setSearchItems } = useContext(SearchContext);

  const inputSearchRef = useRef();

  function searchHandler() {
    const searchVal = inputSearchRef.current.value;

    setSearchItems(
      data?.data?.filter(
        (item) =>
          item.title.toLowerCase().includes(searchVal.toLowerCase()) ||
          item.price.toString().includes(searchVal.toString())
      )
    );

  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="bg-[#dec9e9] w-full">
            <IconButton
              size="large"
              edge="start"
              color="#47126b"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon sx={{backgroundColor:"47126b"}}/> */}
            </IconButton>
            <div className="flex justify-between w-full">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#47126b" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  inputRef={inputSearchRef}
                  onChange={searchHandler}
                  sx={{ color: "#47126b" }}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              {/* <AccountCircleIcon fontSize="large"sx={{color:"#47126b",marginRight:"0px"}}></AccountCircleIcon> */}
              {buttonDarkMode}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
