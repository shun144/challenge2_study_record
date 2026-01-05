import React from "react";
import DeleteButton from "../../atoms/button/DeleteButton";
import styled from "styled-components";

const RecordLi = (props) => {
  const { record, onDelete } = props;
  return (
    <SLi>
      <p>{`${record.title}`}</p>
      <p>{`${record.time}時間`}</p>
      <DeleteButton onClick={onDelete}>削除</DeleteButton>
    </SLi>
  );
};

export default RecordLi;

const SLi = styled.li`
  display: grid;
  grid-template-columns: 40% 40% 20%;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;
