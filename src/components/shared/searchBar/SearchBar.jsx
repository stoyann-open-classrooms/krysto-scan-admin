import React, { useState } from 'react';
import './searchBar.css'
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className='searchBar-container' onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button  type="submit">Rechercher</button>
    </form>
    
  );
}

export default SearchBar;