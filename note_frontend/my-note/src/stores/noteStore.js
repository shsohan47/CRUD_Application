import {create} from "zustand"
import axios from "axios";
const useNoteStore = create((set)=>
({
    notes: [],

    createForm: {
        title:"",
        body:"",
        type: "note"
    },
    updateNote:
    {
        _id: null,
        title:"",
        body:"",
        type:"note",
    },
    fetchNotes: async()=>
    {
       
          try{
            const res = await axios.get("/notes");
            set(state=>
                {
               return  {
                    notes:res.data.notes
          }
        })
          }
          catch(err){
            console.error("Error passing the data",err)
          }
    },

    updateCreateField: (e) =>
    {
        const { name, value } = e.target;

        set((state)=>
        {
            return {
                createForm: {
                    ...state.createForm,
                    [name]: value
                }
            }
        })
   
    },
    createNote : async ()=>
    {
        try {
            const {createForm} = useNoteStore.getState();
           const res =  await axios.post("/create", createForm,{withCredentials:true});
            //make the input field empty after add the note
            set((state) => ({
                notes: [...state.notes, res.data.note],createForm:{
                    title:"",
                    body:"",
                    type: "note"
                }
              }));
              
            
          } catch (error) {
            console.error("Error creating note:", error);
          }
    },
    Deletenote : async(_id)=>
    {
        //delete the note
        try {
            await axios.delete(`/delete-note/${_id}`,{withCredentials:true});
            set((state) => ({
              notes: state.notes.filter((note) => {
              return note._id !== _id})
            }));
          } catch (error) {
            console.error("Error deleting note:", error);
          }

    //setNotes(newNotes);
    },
    
    HandleSubmit : async(e)=>
    {
      
        e.preventDefault();
        await useNoteStore.getState().createNote();
        await useNoteStore.getState().fetchNotes();
       
    },
    handleUpdateSubmit : (e)=>
    {
        const { value, name } = e.target;

        set((state) => ({
            updateNote: {
              ...state.updateNote,
              [name]: value
            }
          }));
       
    },
    toggleUpdate : (note) =>
    {
      const  {_id,title,body,type} = note;
     //set state on update form
     set(
        {
            updateNote:
            {
                _id,
                title,
                 body,
                type,
            }
        }
     )
    
    }, 
    UpdateNote :async(e)=>
    {
        e.preventDefault();
    const { title, body, type, _id } = useNoteStore.getState().updateNote;
    const notes = useNoteStore.getState().notes
    //Send the update request
    const res = await axios.put(
      `/edit-note/${_id}`,
      {
        title,
        body,
        type,
      },{withCredentials:true}
    );

    //update state
    const newNote = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNote[noteIndex] = res.data.note;
    set((state)=>
    ({
      notes : newNote,
      updateNote:{
      _id: null,
      title: "",
      body: "",
      type: "note",
      }
    }))
    }

}))

export default useNoteStore;