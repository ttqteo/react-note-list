import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import NoteList from "./components/NoteList";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

const NOTE_APP_STORAGE_KEY = "NOTE_APP";

function App() {
  const [noteList, setNoteList] = useState([]);
  const [noteListArchive, setNoteListArchive] = useState([]);
  const [textInput, setTextInput] = useState("");

  //Storage Local
  useEffect(() => {
    const storageNoteList = localStorage.getItem(NOTE_APP_STORAGE_KEY);
    if (storageNoteList) {
      setNoteList(JSON.parse(storageNoteList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(NOTE_APP_STORAGE_KEY, JSON.stringify(noteList));
  }, [noteList]);

  //On click
  const onChangeFunction = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onClickAddBtn = useCallback(() => {
    setNoteList([
      { id: v4(), name: textInput, isCompleted: false, isDeleted: false },
      ...noteList,
    ]);
    setTextInput("");
  }, [textInput, noteList]);

  const onClickCheckBtn = useCallback((id) => {
    setNoteList((prevState) =>
      prevState.map((note) =>
        note.id === id ? { ...note, isCompleted: true } : note
      )
    );
  }, []);

  const onClickTrashBtn = useCallback((id) => {
    setNoteList((prevState) =>
      prevState.map((note) =>
        note.id === id ? { ...note, isDeleted: true } : note
      )
    );
  }, []);

  return (
    <div className="App">
      <div className="App-title">
        <h5>Danh sách việc cần làm</h5>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          value={textInput}
          onChange={onChangeFunction}
          onKeyPress={(e) => (e.charCode === 13 ? onClickAddBtn() : "")}
          placeholder="Thêm công việc mới"
        />
        <InputGroup.Append>
          <Button
            variant="primary"
            disabled={!textInput}
            onClick={onClickAddBtn}
          >
            Thêm
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <NoteList
        noteList={noteList}
        onClickCheckBtn={onClickCheckBtn}
        onClickTrashBtn={onClickTrashBtn}
      />
    </div>
  );
}

export default App;
