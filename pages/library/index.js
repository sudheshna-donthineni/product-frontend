import BookList from "components/library/bookList";
import React, { useEffect, useState } from "react";
import BookFilter from "components/library/filter";
import BookSort from "components/library/sort";
import { Container, Stack, Typography, Button, styled } from "@mui/material";
import LibraryAPI from "services/API/library";

const AddBookButton = styled(Button)(({ theme }) => ({
  height: "100%",
  ":hover": {
    background: "black",
    color: theme.palette.primary.main,
  },
}));

export default function Library() {
  const [openFilter, setOpenFilter] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(async () => {
    setAllBooks(await LibraryAPI.getAllBooks());
  }, []);

  return (
    <Container>
      <Typography variant="h2" sx={{ textAlign: "center", letterSpacing: 30 }}>
        LIBRARY
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 5, mt: 5, height: 60 }}
      >
        <AddBookButton variant="contained" component="a" href="/library/add">
          ADD A BOOK
        </AddBookButton>
        <Stack direction="row" spacing={1}>
          <BookFilter
            isOpenFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <BookSort />
        </Stack>
      </Stack>
      <BookList books={allBooks} />
    </Container>
  );
}
