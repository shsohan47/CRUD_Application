// NoteForm.js
import { useState } from "react";
import {  useEffect } from "react";
import "../App.css";
import axios from "axios";
//import GetNote from "./GetNote";

function NoteForm() {
    const [createForm, setCreateForm] = useState({
        title: "",
        body: "",
        type: "note",
    });

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    async function fetchNotes() {
        try {
            const res = await axios.get("http://localhost:3000/notes");
           await setNotes(res.data.note);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }

    async function createNote() {
        try {
            const res = await axios.post("http://localhost:3000/create", createForm);
            console.log(res);
            setCreateForm({
                title: "",
                body: "",
                type: "note",
            });
            
        } catch (error) {
            console.error("Error creating note:", error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await createNote();
        await fetchNotes();

    }

    function updateCreateField(e) {
        const { name, value } = e.target;
        setCreateForm({
            ...createForm,
            [name]: value,
        });
    }

    return (
        <div>
             <div>
            <h2>===Notes===</h2>
            {notes.map((note) => (
                <div key={note._id}>
                    <h3>{note.title}</h3>
                </div>
            ))}
        </div>
        <div className="container">
            
            <form onSubmit={handleSubmit} method="POST">
                <label htmlFor="title">Title:</label>
                <input onChange={updateCreateField} type="text" id="title" name="title" value={createForm.title} placeholder="Enter title..." required />

                <label htmlFor="body">Body:</label>
                <textarea onChange={updateCreateField} id="body" name="body" value={createForm.body} rows="4" placeholder="Enter details..." required></textarea>

                <label htmlFor="type">Type:</label>
                <select onChange={updateCreateField} id="type" name="type" value={createForm.type}>
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

export default NoteForm;
