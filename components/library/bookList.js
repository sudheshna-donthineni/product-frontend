import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import BookCard from "components/library/card";
import React, { useState } from "react";
import Pagination from "components/Pagination";
import { store } from "store";

BookList.propTypes = {
  books: PropTypes.array.isRequired,
};

export default function BookList({ books }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const filters = store.getState().filters;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {books
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

          .map((book) => {
            return (
              <Grid key={book.bookId} item xs={12} sm={6} md={3}>
                <BookCard book={book} />
              </Grid>
            );
          })}
      </Grid>
      <Pagination
        count={books.length}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
