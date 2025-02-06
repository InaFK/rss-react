import { Component } from 'react';
import './ResultList.css';

interface Props {
  results: { name: string; description: string }[];
  errorMessage: string | null;
}

class ResultList extends Component<Props> {
  render() {
    const { results, errorMessage } = this.props;

    return (
      <div className="result-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index}>
              <h2>{result.name}</h2>
              <p>{result.description}</p>
            </div>
          ))
        ) : (
          <p>No results found. Please try searching for a full Pokémon name.</p>
        )}
      </div>
    );
  }
}

export default ResultList;
