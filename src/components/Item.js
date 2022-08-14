import { Badge } from "@mui/material";
import React from "react";
import { img_300, unavailable } from "../config/config";
import "./Item.css";

function Item({ item, type }) {
  return (
    <div className="item">
      <Badge
        badgeContent={item.vote_average?.toFixed(2)}
        color={item.vote_average > 6.5 ? "primary" : "secondary"}
      >
        <img
          src={item.poster_path ? `${img_300}${item.poster_path}` : unavailable}
          alt={item.title || item.name}
        />{" "}
      </Badge>
      <span className="title">{item.title || item.name}</span>
      <div className="sub-titles">
        <span className="type">
          {(type || item.media_type) === "movie" ? "Movie" : "TV Series"}
        </span>
        <span className="date">{item.release_date || item.first_air_date}</span>
      </div>
    </div>
  );
}

export default Item;
