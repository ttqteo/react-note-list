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

  ${(props) =>
    props.isdeleted &&
    css`
      display: none;
    `}

  &:hover .btn-icon-wrapper .btn-icon,
  &.active .btn-icon {
    color: #eee;
  }

  &:hover .btn-icon-wrapper,
  .btn-icon-wrapper {
    display: flex;
  }

  .btn-icon {
    display: block;
    width: 25px;
    color: #666;
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
        iscompleted={note.isCompleted ? "true" : undefined}
        isdeleted={note.isDeleted ? "true" : undefined}
        variant="outline-secondary"
        block
        active={note.isCompleted}
        onClick={(e) => {
          if (!e.target.closest(".btn-icon")) onClickCheckBtn(note.id);
        }}
      >
        {note.name}
        <div className="btn-icon-wrapper">
          <span className="btn-icon">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => onClickTrashBtn(note.id)}
            />
          </span>
        </div>
      </ButtonStyled>
    </>
  );
}
