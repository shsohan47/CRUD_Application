//import NoteForm from "./Note_form"
//import { useState } from "react";
import { useEffect } from "react";
import "../App.css";

//import axios from "axios";
import useNoteStore from "../stores/noteStore";
import AllNotes from "./AllNotes";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";
//import GetNote from "./Components/getNotes";
function App() {

    const store = useNoteStore();
  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <div>
      <AllNotes/>
              <UpdateForm/>
      
      <CreateForm/>
    </div>
  );
}
export default App;
