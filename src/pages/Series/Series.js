import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/CustomPagination";
import Genres from "../../components/Genres";
import Items from "../../components/Items";
import "./Series.css";

function Series() {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const onPageChange = (newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  useEffect(() => {
    const fetchSeries = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${selectedGenres.reduce(
          (acc, curr) => `${curr.id},${acc}`,
          ""
        )}`
      );
      setItems(data.results);
      setTotalPages(data.total_pages);
    };
    fetchSeries();
  }, [page, selectedGenres]);
  return (
    <div>
      <div className="section-header">TV Series</div>
      <Genres
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        type="tv"
      />
      <Items items={items} type="tv"></Items>
      {totalPages > 1 && (
        <div className="pagination">
          <CustomPagination
            onPageChange={onPageChange}
            totalPages={totalPages}
          ></CustomPagination>
        </div>
      )}
    </div>
  );
}

export default Series;
