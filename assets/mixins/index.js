import { css } from "styled-components";

export const ButtonMixin = () => css`
  background: ${theme.palette.primaryPink};
  color: ${theme.palette.background};
  width: 40%;
  font-family: "Merriweather", serif;
  letter-spacing: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 10px;
`;

export const TextBoxMixin = () => css`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input::placeholder {
    @media (max-width: 1024px) {
      font-size: 1.7vw;
    }
    @media (max-width: 700px) {
      font-size: 3vw;
    }
  }
  width: 100%;
`;

export const LabelMixin = () => css`
  font-size: 1.5vw;
  letter-spacing: 2px;
  font-weight: bold;
  color: #333232;
  padding-bottom: 3%;
  @media (max-width: 1024px) {
    font-size: 1.7vw;
  }
  @media (max-width: 700px) {
    font-size: 4vw;
  }
`;
