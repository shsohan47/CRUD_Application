import React from "react"
import {useEffect} from "react"
import useNoteStore from "../stores/noteStore";
import AllNotes from "../Components/AllNotes"
import UpdateForm from "../Components/UpdateForm"
import CreateForm from "../Components/CreateForm"
export default function NotePage()
{
    const store = useNoteStore();
  useEffect(() => {
    store.fetchNotes();
  }, []);
    return(
        <div>
        <AllNotes/>
        <UpdateForm/>
        <CreateForm/>
</div>
    )
}