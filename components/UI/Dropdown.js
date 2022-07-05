import styled from "styled-components";
import { Component } from "react";
import { store } from "store";
import { addNewStudent } from "store/actions";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SelectBox = styled(Select)`
  width: ${(props) => (props.width ? props.width : "100%")};
`;

const Option = styled(MenuItem)`
  justify-content: center;
  padding-top: 5%;
  padding-bottom: 5%;
`;

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let payload = {};
    payload[this.props.placeholder] = e.target.value || this.state.value;
    this.setState({ value: e.target.value });
    store.dispatch(addNewStudent(payload));
  }

  render() {
    return (
      <SelectBox
        width={this.props.width}
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
      >
        {this.props.data.map((node, index) => {
          return (
            <Option key={index} value={node}>
              {node}
            </Option>
          );
        })}
      </SelectBox>
    );
  }
}

export default Dropdown;
