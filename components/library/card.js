import PropTypes from "prop-types";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Label from "components/UI/Label";
import { useState } from "react";
import Router from "next/router";
const BookCardStyle = styled(Card)(({ theme }) => ({
  border: "0.5px solid grey",
}));

BookCard.propTypes = {
  book: PropTypes.object,
};

export default function BookCard({ book }) {
  const { bookId, title, author, numberOfPages, status, genre } = book;

  const onClickHandler = () => {
    Router.push({
      pathname: "/library/view",
      query: {
        bookId: bookId,
        title: title,
        author: author,
        numberOfPages: numberOfPages,
        status: status,
        genre: genre,
      },
    });
  };
  return (
    <BookCardStyle
      sx={{
        ":hover": {
          boxShadow: 20,
          cursor: "pointer",
        },
      }}
      onClick={onClickHandler}
    >
      <Box sx={{ pt: "20%", position: "relative", pb: "20%", height: "100%" }}>
        {status && (
          <Label
            variant={(status == "available" && "outlined") || "filled"}
            color={
              (status === "overdue" && "error") ||
              (status == "borrowed" && "secondary") ||
              "primary"
            }
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )}
        <Stack
          spacing={2}
          sx={{
            pl: 2,
            pr: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
          }}
        >
          <Typography sx={{}}>{title}</Typography>

          <Typography variant="subtitle2">
            &nbsp;
            {author}
          </Typography>
        </Stack>
      </Box>
    </BookCardStyle>
  );
}
