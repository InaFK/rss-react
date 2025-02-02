import React, { Component } from 'react';
import './Search.css';

interface Props {
  onSearch: (term: string) => void;
}

interface State {
  searchTerm: string;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = { searchTerm: savedTerm.trim() };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm }, () => {
      localStorage.setItem('searchTerm', searchTerm.trim());
      if (searchTerm.trim().length >= 3 || searchTerm.trim().length === 0) {
        this.props.onSearch(searchTerm.trim());
      }
    });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    const trimmedTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    if (trimmedTerm.length >= 3 || trimmedTerm.length === 0) {
      this.props.onSearch(trimmedTerm);
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
