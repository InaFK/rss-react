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

    if (trimmedTerm.length >= 5 || trimmedTerm.length === 0) {
      onSearch(trimmedTerm);
    } else {
      onError('API search result can only be fetched by entering a whole Pokémon name.');
    }
  };

  return (
    <div className="search-container">
      <input
        type="search"
        name="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
