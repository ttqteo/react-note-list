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

  const onClickAddBtn = useCallback(
    (e) => {
      setNoteList([
        { id: v4(), name: textInput, isCompleted: false },
        ...noteList,
      ]);
      setTextInput("");
    },
    [textInput, noteList]
  );

  const onClickCheckBtn = useCallback((id) => {
    setNoteList((prevState) =>
      prevState.map((note) =>
        note.id === id ? { ...note, isCompleted: true } : note
      )
    );
  }, []);

  return (
    <div className="App">
      <h5 className="App-title">Danh sách việc cần làm</h5>
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
      <NoteList noteList={noteList} onClickCheckBtn={onClickCheckBtn} />
    </div>
  );
}

export default App;
