import useNoteStore from "../stores/noteStore"
import "./App.css"
export default function CreateForm()
{
    const store = useNoteStore();
    return(
      <div>
        <div className="container ">
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
    )
}