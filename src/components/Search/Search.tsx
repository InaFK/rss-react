import React from 'react';
import useSearchQuery from '../../hooks/useSearchQuery';
import './Search.css';

interface Props {
  onSearch: (term: string) => void;
  onError: (message: string) => void;
}

const Search: React.FC<Props> = ({ onSearch, onError }) => {
  const [searchTerm, setSearchTerm] = useSearchQuery();
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm.length >= 1 || trimmedTerm.length === 0) {
      onSearch(trimmedTerm);
    } else {
      onError('API search result can only be fetched by entering a whole Pokémon name.');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-container">
      <input
        type="search"
        name="search"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
