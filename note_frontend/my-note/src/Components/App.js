//import NoteForm from "./Note_form"
//import { useState } from "react";
import { useEffect } from "react";
import "../App.css";

//import axios from "axios";
import useNoteStore from "../stores/noteStore";
import AllNotes from "./AllNotes";
//import GetNote from "./Components/getNotes";
function App() {

    const store = useNoteStore();
  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <div>
      <AllNotes/>
              {store.updateNote._id && (
                
                <form onSubmit={store.UpdateNote} method="POST">
                  <label htmlFor="title">Title:</label>
                  <input
                    onChange={store.handleUpdateSubmit}
                    type="text"
                    id="title"
                    name="title"
                    value={store.updateNote.title}
                    placeholder="Enter title..."
                    required
                  />

                  <label htmlFor="body">Body:</label>
                  <textarea
                    onChange={store.handleUpdateSubmit}
                    id="body"
                    name="body"
                    value={store.updateNote.body}
                    rows="4"
                    placeholder="Enter details..."
                    required
                  ></textarea>

                  <label htmlFor="type">Type:</label>
                  <select
                    onChange={store.handleUpdateSubmit}
                    id="type"
                    name="type"
                    value={store.updateNote.type}
                  >
                    <option value="note">Note</option>
                    <option value="quickNote">Quick Note</option>
                  </select>

                  <button type="submit">Submit</button>
                </form>
              )}
           
      
      <div className="container">
        <form onSubmit={store.HandleSubmit} method="POST">
          <label htmlFor="title">Title:</label>
          <input
            onChange={store.updateCreateField}
            type="text"
            id="title"
            name="title"
            value={store.createForm.title}
            placeholder="Enter title..."
            required
          />

          <label htmlFor="body">Body:</label>
          <textarea
            onChange={store.updateCreateField}
            id="body"
            name="body"
            value={store.createForm.body}
            rows="4"
            placeholder="Enter details..."
            required
          ></textarea>

          <label htmlFor="type">Type:</label>
          <select
            onChange={store.updateCreateField}
            id="type"
            name="type"
            value={store.createForm.type}
          >
            <option value="note">Note</option>
            <option value="quickNote">Quick Note</option>
          </select>

          <button type="submit">Submit</button>
        </form>

        {/* Pass refresh function to GetNote component */}
      </div>
    </div>
  );
}
export default App;
