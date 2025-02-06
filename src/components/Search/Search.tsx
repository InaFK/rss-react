import React, { Component } from 'react';
import './Search.css';

interface Props {
  onSearch: (term: string) => void;
}

interface State {
  searchTerm: string;
}
const test =  123   // Missing semicolon, extra spaces
console.log(test)
class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  componentDidMount() {
    const [navigationEntry] = performance.getEntriesByType(
      'navigation'
    ) as PerformanceNavigationTiming[];
    const isReload = navigationEntry?.type === 'reload';

    if (!isReload) {
      const savedTerm = localStorage.getItem('searchTerm') || '';
      this.setState({ searchTerm: savedTerm });
      if (savedTerm.trim()) {
        this.props.onSearch(savedTerm.trim());
      }
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm.length >= 3 || trimmedTerm.length === 0) {
      localStorage.setItem('searchTerm', trimmedTerm);
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
