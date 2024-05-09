// NotePage.js

import React, { useEffect } from "react";
import useNoteStore from "../stores/noteStore";
import AllNotes from "../Components/AllNotes";
import UpdateForm from "../Components/UpdateForm";
import CreateForm from "../Components/CreateForm";
import { Link } from "react-router-dom";
import "../Components/NotePage.css";
import SearchBar from "../Components/SearchBar"

export default function NotePage() {
  const store = useNoteStore();

  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <div>
      <Link to="/logout">Logout</Link>
       <SearchBar/>
      <div className="container">
        <div className="section">
          <h2 className="title">Create Note</h2>
          <div className="note-section">
            <CreateForm />
          </div>
        </div>
        <div className="section">
          <h2 className="title">Update Note</h2>
          <div className="note-section">
            <UpdateForm />
          </div>
        </div>

        <div className="section all-notes">
          <h1 className="title">All Notes</h1>
          {store.notes.length > 0 && ( <button 
            style={{
              backgroundColor: "red" /* Green */,
              border: "none",
              color: "white",
              padding: "22px 22px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "10px",
              margin: "2px 22px",
              transitionDuration: "0.4s",
              cursor: "pointer",
              borderRadius: "8px",
              boxShadow:
                "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            }}
            onClick={store.deleteAllNote}
          >
            Erase All Notes
          </button>)}
         

          <div className="all-notes-wrapper">
            <AllNotes /> {/* Pass notes data or rendering logic to AllNotes */}
          </div>
        </div>
      </div>
    </div>
  );
}
