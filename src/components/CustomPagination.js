import { Pagination } from "@mui/material";
import React from "react";

function CustomPagination({ onPageChange, totalPages, page }) {
  return (
    <Pagination
      count={Number(totalPages)}
      color="primary"
      onChange={(e) => onPageChange(e.target.textContent)}
      hideNextButton
      hidePrevButton
      page={page || 0}
    />
  );
}

export default CustomPagination;
