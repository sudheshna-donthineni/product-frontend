import styled from "@emotion/styled";
import { Component } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { TextBoxMixin, LabelMixin } from "assets/mixins";
// import theme from "/styles/theme";

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  ${LabelMixin}
`;

const DateContainer = styled.div`
  width: 100%;
`;

const DatePickerText = styled(TextField)`
  ${TextBoxMixin}
`;

class SelectDatePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BoxContainer>
        <DateContainer>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              value={this.props.value}
              onChange={this.props.handleChange}
              renderInput={(params) => <DatePickerText {...params} />}
            />
          </LocalizationProvider>
        </DateContainer>
      </BoxContainer>
    );
  }
}

export default SelectDatePicker;
