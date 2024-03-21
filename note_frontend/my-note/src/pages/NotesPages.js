// NotePage.js

import React, { useEffect } from "react";
import useNoteStore from "../stores/noteStore";
import AllNotes from "../Components/AllNotes";
import UpdateForm from "../Components/UpdateForm";
import CreateForm from "../Components/CreateForm";
import "../Components/NotePage.css";
import { Link } from "react-router-dom";

export default function NotePage() {
  const store = useNoteStore();

  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <div className="container">
      <div className="section">
        <h1 className="title">All Notes</h1>
        <div className="note-section">
          <AllNotes />
        </div>
      </div>
      <div className="section">
        <h2 className="title">Update Note</h2>
        <div className="note-section">
          <UpdateForm />
        </div>
      </div>
      <div className="section">
        <h2 className="title">Create Note</h2>
        <div className="note-section">
          <CreateForm />
        </div>
      </div>
      <Link to="/logout" style={{color:"#24a0ed"}}>Logout</Link>
    </div>
  );
}
