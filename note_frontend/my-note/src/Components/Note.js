import useNoteStore from "../stores/noteStore";
export default function Note({note})
{
    const store = useNoteStore(store =>
        {//return object's function
            return ({
                Deletenote:store.Deletenote,
                toggleUpdate:store.toggleUpdate})
        });
    return(
        <div key={note._id}>
                  <h3>{note.title}</h3>
                  <button onClick={() => store.Deletenote(note._id)}>Delete</button>
                  <button onClick={() => store.toggleUpdate(note)}>Update</button>
                </div>
    )
    
}