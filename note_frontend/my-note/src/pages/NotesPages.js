// NotePage.js

import React, { useEffect } from "react";
import useNoteStore from "../stores/noteStore";
import AllNotes from "../Components/AllNotes";
import UpdateForm from "../Components/UpdateForm";
import CreateForm from "../Components/CreateForm";
import {Link} from 'react-router-dom'
import "../Components/NotePage.css";
import { Link } from "react-router-dom";


export default function NotePage() {
  const store = useNoteStore();

  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <div><Link to="/logout">Logout</Link>
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
        <div className="all-notes-wrapper">
          <AllNotes /> {/* Pass notes data or rendering logic to AllNotes */}
        </div>
      </div>
      <Link to="/logout" style={{color:"#24a0ed"}}>Logout</Link>
    </div>
    </div>
  );
  
}
