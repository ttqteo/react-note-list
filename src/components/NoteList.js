import React from "react";
import NoteItem from "./NoteItem";

export default function NoteList({
  noteList,
  onClickCheckBtn,
  onClickTrashBtn,
}) {
  return (
    <>
      {noteList.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onClickCheckBtn={onClickCheckBtn}
          onClickTrashBtn={onClickTrashBtn}
        />
      ))}
    </>
  );
}
