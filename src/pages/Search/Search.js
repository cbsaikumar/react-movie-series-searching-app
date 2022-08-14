import { Tab, Tabs, TextField } from "@mui/material";
import "./Search.css";

import React, { useCallback, useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { Box } from "@mui/system";
import axios from "axios";
import Items from "../../components/Items";
import CustomPagination from "../../components/CustomPagination";

function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);

  const onPageChange = (newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const fetchSearch = useCallback(
    async (text) => {
      if (!text) return;
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type === 0 ? "movie" : "tv"
        }?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&page=1&include_adult=false&query=${text}&page=${page}`
      );
      setItems(data.results);
      setTotalPages(data.total_pages);
      onPageChange(data.page);
    },
    [page, type]
  );

  useEffect(() => {
    // searchText.length > 0 && fetchSearch();
  }, [searchText, fetchSearch]);

  return (
    <div className="search-container">
      <div className="search-section">
        <TextField
          fullWidth
          className="search-box"
          type="text"
          label="Search"
          id="search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="btn-search" onClick={() => fetchSearch(searchText)}>
          <SearchIcon varient="contained" fontSize="large" />
        </div>
      </div>
      <Box
        className="tabs-section"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tabs
          value={type}
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          indicatorColor="primary"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search Series" />
        </Tabs>
      </Box>
      {searchText.length > 0 ? (
        items.length > 0 ? (
          <>
            <Items items={items} type={type === 0 ? "movie" : "tv"} />
            {totalPages > 1 && (
              <div className="pagination">
                <CustomPagination
                  onPageChange={setPage}
                  totalPages={totalPages}
                  page={page}
                ></CustomPagination>
              </div>
            )}
          </>
        ) : (
          <h1 className="empty-search-msg">No movies found</h1>
        )
      ) : (
        <h1 className="empty-search-msg">Enter a search text</h1>
      )}
    </div>
  );
}

export default Search;
