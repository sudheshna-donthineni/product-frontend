import React, { useEffect, useState } from "react";
import { Typography, Button, styled } from "@mui/material";
import TextInputBox from "components/UI/InputField";
import Dropdown from "components/UI/Dropdown";
import LibraryAPI from "services/API/library";
import { store } from "store";
import Router from "next/router";

const Form = styled("div")(() => ({
  width: "80%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: 60,
  display: "flex",
  flexDirection: "row",
}));

const Row = styled("div")(() => ({
  width: "100%",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
}));

const AddBookButton = styled(Button)(({ theme }) => ({
  width: "40%",
  marginTop: 40,
  fontSize: 30,
  marginLeft: "auto",
  marginRight: "auto",
  ":hover": {
    background: "black",
    color: theme.palette.primary.main,
  },
}));

export default function addBook() {
  const data = ["Fiction", "Non-fiction", "Reference"];

  const [bookId, setBookId] = useState("");

  useEffect(async () => {
    setBookId(await LibraryAPI.getBookId());
  }, []);

  function clickHandler() {
    const globalState = store.getState();
    const validStoreState = [
      "bookTitle",
      "author",
      "genre",
      "numberOfPages",
    ].every((field) => {
      return (
        Object.keys(globalState).includes(field) &&
        globalState[field] != undefined &&
        globalState[field] != ""
      );
    });

    if (validStoreState) {
      LibraryAPI.writeNewBook(bookId, globalState);
      Router.push({
        pathname: "/library",
      });
    }
  }
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", letterSpacing: 30 }}>
        LIBRARY
      </Typography>

      <Form>
        <Row>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Book ID
          </Typography>
          <TextInputBox
            label="bookId"
            placeholder=""
            width="70%"
            value={bookId}
            disabled={true}
          />
          <Typography variant="subtitle1" sx={{ mb: 1, mt: 5 }}>
            Author
          </Typography>
          <TextInputBox
            label="author"
            placeholder=""
            width="70%"
            textlimit={100}
          />
        </Row>
        <Row>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Book Name
          </Typography>
          <TextInputBox
            label="bookTitle"
            placeholder=""
            width="70%"
            textlimit={100}
          />
          <Typography variant="subtitle1" sx={{ mb: 1, mt: 5 }}>
            Genre
          </Typography>
          <Dropdown placeholder="genre" data={data} width="70%" />
        </Row>
      </Form>
      <Typography
        variant="subtitle1"
        sx={{ mb: 1, mt: 6, marginLeft: "auto", marginRight: "auto" }}
      >
        Number of Pages
      </Typography>
      <TextInputBox
        label="numberOfPages"
        placeholder=""
        width="20%"
        type="number"
      />

      <AddBookButton variant="contained" onClick={clickHandler}>
        ADD BOOK
      </AddBookButton>
    </>
  );
}
