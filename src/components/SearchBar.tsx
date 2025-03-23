import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="filter">
      <label htmlFor="search-input">Search by Name: </label>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Enter country name..."
      />
    </div>
  );
};

export default SearchBar;