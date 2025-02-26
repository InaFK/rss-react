import { useState } from 'react';
import './ResultList.css';

interface Props {
  results: { name: string; description: string }[];
  errorMessage: string | null;
  loading: boolean;
  onSelect: (item: { name: string; description: string }) => void;
}

const ResultList = ({ results, errorMessage, loading, onSelect }: Props) => {
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const handleSelect = (item: { name: string; description: string }) => {
    setSelectedName(item.name);
    onSelect(item); 
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="result-container">
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : results.length > 0 ? (
        <ul className="result-list">
          {results.map((result) => (
            <li
              key={result.name}
              className={`result-item ${result.name === selectedName ? 'selected' : ''}`}
              onClick={() => handleSelect(result)}
            >
              <h2>{result.name}</h2>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found. Please try searching for a full Pokémon name.</p>
      )}
    </div>
  );
};

export default ResultList;
