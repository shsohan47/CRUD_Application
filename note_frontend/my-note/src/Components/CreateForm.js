// CreateForm.js

import useNoteStore from "../stores/noteStore";
import "./App.css";

export default function CreateForm() {
  const store = useNoteStore();
  
  return (
    <div className="container">
      <form onSubmit={store.HandleSubmit} method="POST">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          onChange={store.updateCreateField}
          type="text"
          id="title"
          name="title"
          value={store.createForm.title}
          placeholder="Enter title..."
          className="form-input"
          required
        />

        <label htmlFor="body" className="form-label">Body:</label>
        <textarea
          onChange={store.updateCreateField}
          id="body"
          name="body"
          value={store.createForm.body}
          rows="4"
          placeholder="Enter details..."
          className="form-textarea"
          required
        ></textarea>

        <label htmlFor="type" className="form-label">Type:</label>
        <select
          onChange={store.updateCreateField}
          id="type"
          name="type"
          value={store.createForm.type}
          className="form-select"
        >
          <option value="note">Note</option>
          <option value="quickNote">Quick Note</option>
        </select>

        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
}
