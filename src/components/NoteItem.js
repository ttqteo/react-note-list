import React from "react";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";

const ButtonStyled = styled(Button)`
  display: flex;
  justify-content: space-between;

  &,
  &:hover {
    ${(props) =>
      props.iscompleted &&
      css`
        text-decoration: line-through;
      `}
  }

  &:hover .btn-icon-wrapper {
    display: flex;
  }
  &:hover .btn-icon-wrapper .btn-icon {
    color: #eee;
  }

  .btn-icon-wrapper {
    display: none;
  }

  .btn-icon {
    display: block;
    width: 25px;
    color: #333;
    margin-left: 4px;
  }
  .btn-icon:hover {
    background-color: rgba(238, 238, 238, 0.3);
    border-radius: 50%;
  }
`;

export default function NoteItem({ note, onClickCheckBtn, onClickTrashBtn }) {
  return (
    <>
      <ButtonStyled
        iscompleted={note.isCompleted}
        variant="outline-secondary"
        block
      >
        {note.name}
        <div className="btn-icon-wrapper">
          <span className="btn-icon" onClick={() => onClickCheckBtn(note.id)}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className="btn-icon">
            <FontAwesomeIcon icon={faEdit} />
          </span>
          <span
            className="btn-icon"
            onClick={() => {
              onClickTrashBtn(note.id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      </ButtonStyled>
    </>
  );
}
