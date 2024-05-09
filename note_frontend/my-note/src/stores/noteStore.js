import {create} from "zustand"
import axios from "axios";


const useNoteStore = create((set)=>
({
    notes: [],
    query: "",

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
        user:"",
        __v: 0
    },

    searchNotes: async(query)=>
    {
      try{
        console.log("query",query)
        const response = await axios.get(`/search?search=${query}`)
        console.log("response:",response)
        set(state=>{
          return{
            notes:response.data.notes
          }
        })
      }catch(error)
      {
        console.log(error)
      }
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
    updateQueryState:(e)=>
    {
      const {value} = e.target
      set((state)=>
    {
      return{
        query: value
      }
     
    })
    
    },
    createNote : async ()=>
    {
        try {
            const {createForm} = useNoteStore.getState();
           const res =  await axios.post("/create", createForm);
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
            await axios.delete(`/delete-note/${_id}`);
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
      const  {_id,title,body,type,user,__v} = note;
     //set state on update form
     set(
        {
            updateNote:
            {
                _id,
                title,
                 body,
                type,
                user,
                __v
            }
        }
     )
    
    }, 
    UpdateNote :async(e)=>
    {
        e.preventDefault();
    const { title, body, type, _id,user,__v } = useNoteStore.getState().updateNote;
    const notes = useNoteStore.getState().notes
    try{
    //Send the update request
     await axios.put(
      `/edit-note/${_id}`,
      {
        title,
        body,
        type,
        user,
        __v
      }
    );

    //update state
    const updateNote = notes.map(note=>
    {
      if(note._id === _id)
      {
        return useNoteStore.getState().updateNote;
      }else{
        return note
      }
    });
    
    set((state)=>
    ({
      ...state,
      notes : updateNote,
      
    }))
    // console.log(useNoteStore.getState().notes)
  }catch(error)
  {
    console.error("error updating note:",error)
  }
    },
    deleteAllNote: async()=>
    {
      try{
        await axios.delete("/delete-all");
        set((state)=>({
           notes:[]
        }))
      }catch(err){
        console.log("Error is happening for delete all note")
      }
      }

}))

export default useNoteStore;