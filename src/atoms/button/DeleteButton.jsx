import React from "react";
import styled from "styled-components";

const DeleteButton = (props) => {
  const { children, onClick = undefined } = props;
  return <SButton onClick={onClick}>{children}</SButton>;
};

export default DeleteButton;

const SButton = styled.button`
  cursor: pointer;
`;
