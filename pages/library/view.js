import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Stack, TableCell, Typography, Button } from "@mui/material";
import Table from "components/library/table";
import { bookTableHeaders, bookDetails } from "config/library";
import { ReturnBook } from "components/library/returnBook";
import { BorrowBook } from "components/library/borrowBook";
import LibraryAPI from "services/API/library";

const BookDetailStyle = styled("table")(({ theme }) => ({
  marginTop: 30,
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
}));

const TableRow = styled("tr")(({ theme }) => ({
  alignItems: "center",
}));

const RequestBookButton = styled(Button)(({ theme }) => ({
  height: "100%",
  ":hover": {
    background: "black",
    color: theme.palette.primary.main,
  },
}));

const ReturnBookButton = styled(Button)(({ theme }) => ({
  height: "100%",
  ":hover": {
    background: "black",
    color: theme.palette.primary.main,
  },
}));

export default function BookDetails() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [openBorrow, setOpenBorrow] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);

  const handleOpenBorrow = () => setOpenBorrow(true);
  const handleCloseBorrow = () => setOpenBorrow(false);
  const handleOpenReturn = () => setOpenReturn(true);
  const handleCloseReturn = () => setOpenReturn(false);

  useEffect(async () => {
    if (router.query.bookId)
      setTransactions(await LibraryAPI.getBookTransaction(router.query.bookId));
  }, [router.query]);

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Library
      </Typography>
      <BookDetailStyle>
        <tbody>
          {bookDetails.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.map((bookDetail) => {
                  return (
                    <>
                      <TableCell key={bookDetail.key} align="center">
                        <b>{bookDetail.value}</b>
                      </TableCell>
                      <TableCell align="center">
                        {router.query[bookDetail.key]}
                      </TableCell>
                    </>
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </BookDetailStyle>
      <Stack
        direction="row"
        sx={{ marginLeft: "auto", marginRight: "auto", mt: 2, mb: 2 }}
        spacing={10}
      >
        <RequestBookButton onClick={handleOpenBorrow} variant="contained">
          BORROW BOOK
        </RequestBookButton>

        <BorrowBook
          open={openBorrow}
          handleCloseBorrow={handleCloseBorrow}
          bookId={router.query.bookId}
          title={router.query.title}
        />

        <ReturnBookButton onClick={handleOpenReturn} variant="contained">
          RETURN BOOK
        </ReturnBookButton>

        <ReturnBook open={openReturn} handleCloseReturn={handleCloseReturn} />
      </Stack>
      <Table
        headCells={bookTableHeaders}
        order={"asc"}
        orderBy={"Student Name"}
        rows={transactions}
        page={0}
        rowsPerPage={10}
      />
    </>
  );
}
