import React, { Component } from 'react';
import './ResultList.css';

interface Props {
  results: { name: string; description: string }[];
}

class ResultList extends Component<Props> {
  render() {
    const { results } = this.props;

    return (
      <div className="result-container">
        {results.map((result, index) => (
          <div key={index}>
            <h2>{result.name}</h2>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultList;
