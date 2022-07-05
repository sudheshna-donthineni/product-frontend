import TablePagination from "@mui/material/TablePagination";
export default function Pagination(props) {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, 50]}
      component="div"
      count={props.count}
      rowsPerPage={props.rowsPerPage}
      page={props.page}
      onPageChange={props.handleChangePage}
      onRowsPerPageChange={props.handleChangeRowsPerPage}
    />
  );
}
