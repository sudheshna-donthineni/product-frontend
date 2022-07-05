import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";

function CustomTableHead(props) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Checkbox
            color="primary"
            size="small"
            indeterminate={
              props.numSelected > 0 && props.numSelected < props.rowCount
            }
            checked={props.rowCount > 0 && props.numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
            inputProps={{
              "aria-label": "select all rows",
            }}
          />
        </TableCell>
        {props.headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="normal"
            sortDirection={props.orderBy === headCell.id ? props.order : false}
          >
            <TableSortLabel
              active={props.orderBy === headCell.id}
              direction={props.orderBy === headCell.id ? props.order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {props.orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {props.order === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

export default function DataTable(props) {
  return (
    <TableContainer>
      <Table aria-labelledby={props.ariaLabel} size="medium">
        <CustomTableHead
          headCells={props.headCells}
          numSelected={props.numSelected}
          order={props.order}
          orderBy={props.orderBy}
          onSelectAllClick={props.handleSelectAllClick}
          onRequestSort={props.handleRequestSort}
          rowCount={props.rowCount}
        />
        <TableBody>
          {stableSort(props.rows, getComparator(props.order, props.orderBy))
            .slice(
              props.page * props.rowsPerPage,
              props.page * props.rowsPerPage + props.rowsPerPage
            )
            .map((row, index) => {
              // const isItemSelected = props.isSelected(row.name);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  onClick={(event) => props.handleClick(event, row.name)}
                  role="checkbox"
                  // aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  // selected={isItemSelected}
                >
                  <TableCell>
                    <Checkbox
                      color="primary"
                      size="small"
                      // checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    align="center"
                  >
                    {row[props.headCells[0].key]}
                  </TableCell>
                  <TableCell align="center">
                    {row[props.headCells[1].key]}
                  </TableCell>
                  <TableCell align="center">
                    {row[props.headCells[2].key]}
                  </TableCell>
                  <TableCell align="center">
                    {row[props.headCells[3].key]}
                  </TableCell>
                  <TableCell align="center">
                    {row[props.headCells[4].key]}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
