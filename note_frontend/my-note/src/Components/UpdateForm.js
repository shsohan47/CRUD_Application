import useNoteStore from "../stores/noteStore"

export default function UpdateForm()
{
    const store = useNoteStore();
    if (!store.updateNote._id) {return <></>}
    return(
    <div>
    <h2>Update Note</h2>   
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
            </div>
          
    )
}