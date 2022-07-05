import { Component } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

function createData(admissionNumber, fname, lname, studentClass, email, phone) {
  return {
    admissionNumber,
    fname,
    lname,
    studentClass,
    email,
    phone,
  };
}

const rows = [
  createData(123, "ABC", "DEF", 2, "abc@gmail.com", 987656426),
  createData(123, "ABC", "DEF", 2, "abc@gmail.com", 987656426),
  createData(123, "ABC", "DEF", 2, "abc@gmail.com", 987656426),
  createData(123, "ABC", "DEF", 2, "abc@gmail.com", 987656426),
  createData(123, "ABC", "DEF", 2, "abc@gmail.com", 987656426),
];

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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

const headCells = [
  {
    id: "admissionNumber",
    numeric: true,
    disablePadding: false,
    label: "Admission Number",
  },
  {
    id: "fname",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lname",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "studentClass",
    numeric: true,
    disablePadding: false,
    label: "Class",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email Address",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "calories",
      selected: [],
      page: 0,
      rowsPerPage: 10,
    };
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.emptyRows = this.emptyRows.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    this.setState({ order: isAsc ? "desc" : "asc" });
    this.setState({ orderBy: property });
  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      this.setState({ selected: newSelecteds });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ page: 0 });
  };

  isSelected = (name) => this.state.selected.indexOf(name) !== -1;

  emptyRows = () =>
    this.state.page > 0
      ? Math.max(0, (1 + page) * this.state.rowsPerPage - rows.length)
      : 0;

  render() {
    return (
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={this.state.selected.length} />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <EnhancedTableHead
              numSelected={this.state.selected.length}
              order={this.state.order}
              orderBy={this.state.orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(
                rows,
                getComparator(this.state.order, this.state.orderBy)
              )
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map((row, index) => {
                  const isItemSelected = this.isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => this.handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell id={labelId} scope="row" align="center">
                        {row.admissionNumber}
                      </TableCell>
                      <TableCell align="center">{row.fname}</TableCell>
                      <TableCell align="center">{row.lname}</TableCell>
                      <TableCell align="center">{row.studentClass}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                    </TableRow>
                  );
                })}
              {this.emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * this.emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onPageChange={this.handleChangePage}
          onRowsPerPageChange={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
