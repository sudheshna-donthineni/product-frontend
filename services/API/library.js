import client from "services/API/rootClient.js";

export default {
  getBookId() {
    return new Promise((resolve) => {
      client.get("/library/get-book-id").then((response) => {
        resolve(response.data);
      });
    });
  },
  getAllBooks() {
    return new Promise((resolve) => {
      client.get("/library/get-all-books").then((response) => {
        resolve(response.data);
      });
    });
  },
  writeNewBook(id, bookObject) {
    const params = {
      id: id,
      title: bookObject["bookTitle"],
      author: bookObject["author"],
      genre: bookObject["genre"],
      number_of_pages: bookObject["numberOfPages"],
    };
    return new Promise((resolve) => {
      client.post("/library/create-book", params).then((response) => {
        resolve(response.data);
      });
    });
  },
  writeNewTransaction(
    studentId,
    studentName,
    borrowedDate,
    issuer,
    bookId,
    bookTitle
  ) {
    const params = {
      student_id: studentId,
      student_name: studentName,
      borrowed_date: borrowedDate,
      issuer: issuer,
      book_id: bookId,
      book_title: bookTitle,
    };
    console.log(borrowedDate.get);
    return new Promise((resolve) => {
      client.post("/library/create-transaction", params).then((response) => {
        resolve(response.data);
      });
    });
  },
  getBookTransaction(bookId) {
    const params = new URLSearchParams({ book_id: bookId });
    return new Promise((resolve) => {
      client
        .get("/library/get-transaction-by-book/", { params })
        .then((response) => {
          resolve(response.data);
        });
    });
  },
};
