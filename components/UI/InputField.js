import styled from "@emotion/styled";
import { Component } from "react";
import { store } from "store";
import { addNewStudent } from "store/actions";
import TextField from "@mui/material/TextField";

const InputField = styled(TextField)`
  margin-left: auto;
  margin-right: auto;
  width: ${(props) => (props.width ? props.width : "100%")};
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

class TextInputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      value: "",
      textLimit: this.props.textlimit ? this.props.textlimit : 1000,
      numberLimit: this.props.numberLimit ? this.props.numberLimit : 10,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  writeToStore(value) {
    let payload = {};
    payload[this.props.label] = value;
    store.dispatch(addNewStudent(payload));
  }

  handleChange(e) {
    if (this.props.type == "email") {
      // let re =
      //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // if (!re.test(e.target.value)) {
      //   this.setState({ valid: false, email: e.target.value });
      // } else {
      //   this.setState({ valid: true, email: e.target.value });
      // }
      // this.writeToStore(e.target.value);
    } else if (this.props.type == "number") {
      if (e.target.value.length < 10) {
        this.setState({ valid: false, value: e.target.value });
      } else {
        e.target.value = e.target.value.slice(0, 10);
        this.setState({ valid: true, value: e.target.value });
      }
      this.writeToStore(e.target.value);
    } else {
      if (e.target.value.length < this.state.textLimit) {
        this.setState({ value: e.target.value });
      } else {
        e.target.value = e.target.value.slice(0, this.state.textLimit);
        this.setState({ value: e.target.value });
      }
      this.writeToStore(e.target.value);
    }
  }

  render() {
    return (
      <InputField
        value={this.props.value ? this.props.value : this.state.value}
        width={this.props.width}
        placeholder={this.props.placeholder}
        required={this.props.required}
        onInput={this.handleChange}
        type={this.props.type}
        disabled={this.props.disabled}
      />
    );
  }
}

export default TextInputBox;
