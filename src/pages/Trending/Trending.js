import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/CustomPagination";
import Items from "../../components/Items";
import "./Trending.css";

function Trending() {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);

  const onPageChange = (newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      setItems(data.results);
      setTotalPages(data.total_pages);
    };
    fetchTrending();
  }, [page]);
  return (
    <div>
      <div className="section-header">Trending Today</div>
      <Items items={items}></Items>
      <div className="pagination">
        <CustomPagination
          onPageChange={onPageChange}
          totalPages={totalPages}
        ></CustomPagination>
      </div>
    </div>
  );
}

export default Trending;
