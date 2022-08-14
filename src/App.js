import { Container } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainNav from "./components/MainNav";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Trending from "./pages/Trending/Trending";
import Search from "./pages/Search/Search";
import { ThemeProvider } from "@emotion/react";
import { teal } from "@mui/material/colors";
import { createTheme } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: teal[50],
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Container className="container">
            <Routes>
              <Route path="/" element={<Trending />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Container>
        </div>
        <MainNav />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
