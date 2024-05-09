import React from 'react';
import useNoteStore from '../stores/noteStore';

const SearchBar = () => {
 
    const store = useNoteStore()
    //console.log("query1:",store.query)
    const handleSearchClick = () =>
    {
      store.searchNotes(store.query)
    }

  return (
    <div>
      <input
        type="text"
        placeholder="Search notes..."
        value={store.query}
        onChange={store.updateQueryState}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;
