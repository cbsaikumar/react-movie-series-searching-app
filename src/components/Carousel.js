import { LocalDining } from "@mui/icons-material";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, img_500, unavailable } from "../config/config";
import "./Carousel.css";

export const Carousel = ({ credits }) => {
  const handleDragStart = (e) => e.preventDefault();
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };
  const items = credits.map((credit) => (
    <>
      {credit && (
        <div className="carousal-container">
          {credit && (
            <div key={credit.id} className="carousal-item">
              <img
                alt={credit.name}
                src={
                  credit.profile_path
                    ? img_300 + credit.profile_path
                    : unavailable
                }
                onDragStart={handleDragStart}
                className="carousal-img"
              ></img>
              <span
                style={{
                  fontSize: "13px",
                  padding: "2px 4px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {credit.name}
              </span>
            </div>
          )}
        </div>
      )}
    </>
  ));
  return (
    <>
      {credits && credits.length > 0 ? (
        <AliceCarousel
          mouseTracking
          items={items}
          infinite
          autoPlay
          disableButtonsControls
          disableSlideInfo
          disableDotsControls
          responsive={responsive}
        />
      ) : (
        <LocalDining />
      )}
    </>
  );
};
