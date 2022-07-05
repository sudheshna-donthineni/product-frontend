import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { store } from "store";
import sendDataAPI from "services/API/formData";
import { Component } from "react";
// import theme from "/styles/theme";
import { newStudentFields } from "/config/student";
import { ButtonMixin } from "/styles/mixins/index";

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormButton = styled(Button)`
  ${ButtonMixin}
  background: ${theme.palette.primaryPink};
  color: ${theme.palette.background};
  &:hover {
    background: black;
    color: ${theme.palette.primaryPink};
  }
`;

const Warning = styled.span`
  color: ${theme.palette.primaryPink};
  font-weight: bold;
  font-size: 2vw;

  margin-top: -2%;
`;

export default class SubmitButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      formValue: store.getState(),
    };
    this.submitForm = this.submitForm.bind(this);
  }

  checkAllFields() {
    newStudentFields.map((field) => {
      if (
        field.required &&
        (!(field.label in this.state.formValue) ||
          this.state.formValue[field.label] == "")
      ) {
        this.setState((prevState) => {
          return {
            ...prevState,
            valid: false,
          };
        });
      }
    });
    console.log(store.getState());
  }
  async submitForm(event) {
    event.preventDefault();

    this.checkAllFields();

    if (this.state.valid) console.log("filled");
    sendDataAPI.sendFormData(store.getState());
  }
  render() {
    return (
      <BoxContainer>
        {!this.state.valid && <Warning>Please enter all details!</Warning>}
        <FormButton onClick={this.submitForm} variant="contained">
          {this.props.text}
        </FormButton>
      </BoxContainer>
    );
  }
}
