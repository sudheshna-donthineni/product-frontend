import PropTypes from "prop-types";
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { store } from "store";
import { onFilterChange } from "store/actions";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const FILTER_AVAILABLE_OPTIONS = [
  "Available",
  "Borrowed",
  "Overdue",
  "Not Available",
];
export const FILTER_CATEGORY_OPTIONS = ["Fiction", "Non-fiction", "Reference"];

Filter.propTypes = {
  isOpenFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function Filter({ isOpenFilter, onOpenFilter, onCloseFilter }) {
  function onAvailableFilterChange(key) {
    store.dispatch(onFilterChange(key));
  }

  return (
    <>
      <Button onClick={onOpenFilter}>Filters&nbsp;</Button>

      <Drawer
        anchor="right"
        open={isOpenFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider />

        <Stack spacing={3} sx={{ p: 3 }}>
          <>
            <Typography variant="subtitle1" sx={{ mb: -2 }}>
              Availability
            </Typography>
            <FormGroup>
              {FILTER_AVAILABLE_OPTIONS.map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox />}
                  label={item}
                  onChange={() => onAvailableFilterChange(item)}
                />
              ))}
            </FormGroup>
          </>

          <>
            <Typography variant="subtitle1" sx={{ mb: -2 }}>
              Category
            </Typography>
            <RadioGroup>
              {FILTER_CATEGORY_OPTIONS.map((item) => (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={item}
                />
              ))}
            </RadioGroup>
          </>
        </Stack>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<HighlightOffIcon />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
