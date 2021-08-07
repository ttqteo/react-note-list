import React from "react";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function NoteItem({ note, onClickCheckBtn }) {
  return (
    <>
      <style type="text/css">
        {`
          .btn-item {
            margin-top: 8px;
            display: flex;
            justify-content: space-between;
          }

          .btn-item.checked,
          .btn-item:hover.checked {
            text-decoration: line-through;
          }

          .btn-item:hover .btn-icon-check {
            display: block;
          }

          .btn-icon-check {
            display: none;
            color: #4fff4f;
            width: 24px;
          }
          .btn-icon-check:hover {
            background-color: rgba(238, 238, 238, 0.2);
            border-radius: 50%;
          }

          .btn-item.checked .btn-icon-check {
            display: none;
          }
        `}
      </style>
      <Button variant="outline-secondary" block className="btn-item">
        {note.name}
        <span
          className="btn-icon-check"
          onClick={(e) => {
            e.target.closest(".btn-item").classList.toggle("checked");
            onClickCheckBtn(note.id);
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </span>
      </Button>
    </>
  );
}
