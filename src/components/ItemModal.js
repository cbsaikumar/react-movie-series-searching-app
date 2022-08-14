import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, CircularProgress } from "@mui/material";
import {
  img_300,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../config/config";
import { grey } from "@mui/material/colors";
import axios from "axios";

import "./ItemModal.css";
import { YouTube } from "@mui/icons-material";
import { Carousel } from "./Carousel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  bgcolor: grey[700],
  border: "2px solid #000",
  boxShadow: 24,
  padding: 1,
};

export default function ItemModal({ open, setOpen, id, type }) {
  const handleClose = () => setOpen(false);
  const [item, setItem] = React.useState();
  const [credits, setCredits] = React.useState([]);

  const fetchItem = React.useCallback(async (id, type) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setItem(data);
  }, []);

  const fetchCredits = React.useCallback(async (id, type) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setCredits([...data.cast, ...data.crew]);
  }, []);

  React.useEffect(() => {
    id && type && fetchItem(id, type);
  }, [id, type, fetchItem]);

  React.useEffect(() => {
    id && type && fetchCredits(id, type);
  }, [id, type, fetchCredits]);

  const goToYoutube = async () => {
    const { data } =
      await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    `);
    window.open(`https://youtube.com/watch?v=${data.results[0].key}`);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {item ? (
            <Box sx={style}>
              <div className="modal-item">
                <img
                  className="modal-image_portrait"
                  src={
                    item.poster_path
                      ? `${img_300}${item.poster_path}`
                      : unavailable
                  }
                  alt={item.title || item.name}
                />{" "}
                <img
                  className="modal-image_landscape"
                  src={
                    item.poster_path
                      ? `${img_500}${item.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={item.title || item.name}
                />{" "}
                <div className="modal-text">
                  <span className="modal-title">
                    {item.title || item.name}
                    {item.release_date || item.last_air_date
                      ? ` (${(
                          item.release_date || item.last_air_date
                        ).substring(0, 4)})`
                      : "(/YYYY/)"}
                  </span>
                  <div className="modal-tagline">{item.tagline}</div>
                  <div className="modal-overview">{item.overview}</div>
                  <Carousel className="model-carousel" credits={credits} />
                  <Button
                    className="modal-youtube-button"
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={goToYoutube}
                    startIcon={<YouTube />}
                  >
                    Watch the trailer
                  </Button>
                </div>
              </div>
            </Box>
          ) : (
            <CircularProgress disableShrink />
          )}
        </Fade>
      </Modal>
    </div>
  );
}
