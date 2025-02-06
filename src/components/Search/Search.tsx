import React, { Component } from 'react';
import './Search.css';

interface Props {
  onSearch: (term: string) => void;
  onError: (message: string) => void;
}

interface State {
  searchTerm: string;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: savedTerm });
    if (savedTerm.trim()) {
      this.props.onSearch(savedTerm.trim());
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm.length >= 5 || trimmedTerm.length === 0) {
      localStorage.setItem('searchTerm', trimmedTerm);
      this.props.onSearch(trimmedTerm);
    }
    else {
      this.props.onError('API search result can only be fetched by entering a whole Pokémon name.');
    }
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="search"
          name="search"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
