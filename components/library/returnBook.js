import { Typography, Button, Modal, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const ReturnBookButton = styled(Button)(({ theme }) => ({
  height: "100%",
  ":hover": {
    background: "black",
    color: theme.palette.primary.main,
  },
}));

export const ReturnBook = (props) => {
  return (
    <Modal open={props.open} onClose={props.handleCloseReturn}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" sx={{ mb: 5 }}>
          Confirm book return?
        </Typography>
        <ReturnBookButton onClick={props.handleCloseReturn} variant="contained">
          RETURN BOOK
        </ReturnBookButton>
      </Box>
    </Modal>
  );
};
