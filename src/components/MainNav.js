import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { makeStyles } from "@mui/styles";
import { Movie, Search, Tv, Whatshot } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    background: "#022 !important",
    bottom: 0,
    position: "fixed",
    width: "100%",
    boxShadow: "0px 1px 50px #011",
  },
});

export default function MainNav() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  React.useEffect(() => {
    const routes = {
      0: "",
      1: "movies",
      2: "series",
      3: "search",
    };
    navigate(`/${routes[value] ?? ""}`);
  }, [value, navigate]);

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Trending"
          icon={<Whatshot />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<Movie />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="TV Series"
          icon={<Tv />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<Search />}
        />
      </BottomNavigation>
    </Box>
  );
}
