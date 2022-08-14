import { Chip } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import "./Genres.css";

function Genres({
  totalPages,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  type,
}) {
  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      setGenres(data.genres);
    };
    fetchGenres();

    return () => {
      setGenres([]);
    };
  }, [setGenres, type]);

  const onGenreSelected = (genre) => {
    setGenres(genres.filter((each) => each.id !== genre.id));
    setSelectedGenres([...selectedGenres, genre]);
  };

  const handleDelete = (genre) => {
    setSelectedGenres(selectedGenres.filter((each) => each.id !== genre.id));
    setGenres([...genres, genre]);
  };

  return (
    <div className="genres">
      {selectedGenres?.map((genre) => (
        <Chip
          label={genre.name}
          size="small"
          key={genre.id}
          color="primary"
          onDelete={() => handleDelete(genre)}
          style={{ margin: 2 }}
        />
      ))}
      {genres?.map((genre) => (
        <Chip
          label={genre.name}
          size="small"
          key={genre.id}
          clickable
          onClick={() => onGenreSelected(genre)}
          style={{ margin: 2, backgroundColor: "#efefef" }}
        />
      ))}
    </div>
  );
}

export default Genres;
