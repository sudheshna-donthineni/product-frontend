import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Scale } from "@mui/icons-material";
import useMediaQuery from "../../hooks/mediaQuery";

const Container = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.background,
  },
  "&:active": {
    backgroundColor: theme.palette.background,
  },
}));

const CameraIcon = styled(PhotoCamera)(({ theme }) => ({
  color: theme.palette.primaryPink,
  borderColor: theme.palette.darkBrown,

  "&:hover": {
    backgroundColor: theme.palette.background,
    transform: "scale(1.2)",
    cursor: "pointer",
  },
}));

const Input = styled("input")({
  display: "none",
});
export default function UploadButton() {
  const isSmall = useMediaQuery("(max-width: 1000px)");
  return (
    <>
      <Container component="span">
        <label htmlFor="icon-button-file">
          <CameraIcon fontSize={isSmall ? "small" : "large"} />
        </label>
        <Input accept="image/*" id="icon-button-file" type="file" />
      </Container>
    </>
  );
}
