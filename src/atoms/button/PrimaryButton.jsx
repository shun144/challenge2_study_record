import React from "react";
import styled from "styled-components";

const PrimaryButton = (props) => {
  const { children, onClick = undefined } = props;
  return <SButton onClick={onClick}>{children}</SButton>;
};

export default PrimaryButton;

const SButton = styled.button`
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;
