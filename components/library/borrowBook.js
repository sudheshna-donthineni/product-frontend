import {
  Stack,
  Typography,
  Button,
  Modal,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputField from "components/UI/InputField";
import SelectDatePicker from "components/UI/DatePicker";
import { useEffect, useState } from "react";
import StudentAPI from "services/API/students";
import LibraryAPI from "services/API/library";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const RequestBookButton = styled(Button)(({ theme }) => ({
  height: "100%",
  ":hover": {
    background: "black",
    color: theme.palette.primary.main,
  },
}));

export const BorrowBook = (props) => {
  const [allStudents, setAllStudents] = useState([]);
  const [allIds, setAllIds] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState(null);
  const [borrowedDate, setBorrowedDate] = useState("");
  const issuer = "Sujana";

  const mapIdToStudent = (selectedId) => {
    for (const student in allStudents) {
      if (allStudents[student].id == selectedId) {
        setSelectedStudentName(allStudents[student].name);
      }
    }
  };

  useEffect(async () => {
    let students = Object.values(await StudentAPI.getAllStudents());

    setAllStudents(students);
    setAllIds(students.map((value) => value.id));
  }, []);
  let open = props.open ? props.open : false;
  const handleDateChange = (e) => {
    setBorrowedDate(e._d);
  };

  const isValidValue = (value) => {
    return value != "" && value != undefined;
  };
  const handleCloseBorrow = () => {
    if (
      isValidValue(selectedStudentId) &&
      isValidValue(selectedStudentName) &&
      isValidValue(borrowedDate) &&
      isValidValue(issuer) & isValidValue(props.bookId) &&
      isValidValue(props.title)
    ) {
      LibraryAPI.writeNewTransaction(
        selectedStudentId,
        selectedStudentName,
        borrowedDate,
        issuer,
        props.bookId,
        props.title
      );
      open = false;
    }
  };

  return (
    <Modal open={open} onClose={props.handleCloseBorrow}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Borrow Book?
        </Typography>
        <Stack>
          <>
            <Typography variant="subtitle1" sx={{ mt: 5 }}>
              Student ID
            </Typography>
            <Autocomplete
              disablePortal
              options={allIds}
              value={selectedStudentId}
              onChange={(event, newValue) => {
                setSelectedStudentId(newValue);
                mapIdToStudent(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
          </>
          <>
            <Typography variant="subtitle1" sx={{ mt: 5 }}>
              Student Name
            </Typography>
            <InputField disabled value={selectedStudentName} />
          </>
          <>
            <Typography variant="subtitle1" sx={{ mt: 5 }}>
              Borrowed date
            </Typography>
            <SelectDatePicker
              label="borrowedDate"
              value={borrowedDate}
              handleChange={handleDateChange}
            />
          </>
          <>
            <Typography variant="subtitle1" sx={{ mt: 5 }}>
              Issuer
            </Typography>
            <InputField value={issuer} disabled />
          </>
        </Stack>
        <RequestBookButton
          onClick={handleCloseBorrow}
          variant="contained"
          sx={{ mt: 5 }}
        >
          BORROW BOOK
        </RequestBookButton>
      </Box>
    </Modal>
  );
};
