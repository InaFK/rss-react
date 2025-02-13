import React from 'react';
import './ResultList.css';

interface Props {
  results: { name: string; description: string }[];
  errorMessage: string | null;
  loading: boolean;
}

const ResultList = ({ results, errorMessage, loading }: Props) => { 
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
            <li key={result.name} className="result-item">
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
