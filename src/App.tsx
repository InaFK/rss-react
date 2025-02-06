import { Component } from 'react';
import pokeApiLogo from './assets/pokeapi_256.3fa72200.png';
import Search from './components/Search/Search';
import ResultList from './components/ResultList/ResultList';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
interface State {
  results: { name: string; description: string }[];
  loading: boolean;
  throwError: boolean;
  errorMessage: string | null;
  searchTerm: string;
}

class App extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      throwError: false,
      errorMessage: null,
      searchTerm: '',
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    if (savedTerm.trim()) {
      this.setState({ searchTerm: savedTerm });
      this.fetchResults(savedTerm);
    } else {
      this.fetchInitialResults();
    }
  }

  componentDidUpdate(_prevProps: Record<string, never>, prevState: State) {
    if (this.state.throwError && !prevState.throwError) {
      throw new Error('ErrorBoundary Test error');
    }
  }

  fetchInitialResults = async () => {
    this.setState({ loading: true });
    try {
      const response = await fetch(`
        https://pokeapi.co/api/v2/pokemon?limit=10&offset=0
      `);
      const data = await response.json();
      this.setState({
        results: data.results.map((item: { name: string; url: string }) => ({
          name: item.name,
          description: item.url,
        })),
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching initial results:', error);
      this.setState({ loading: false });
    }
  };

  fetchResults = async (term: string) => {
    if (term.trim() === '') {
      this.fetchInitialResults();
      return;
    }

    this.setState({ loading: true, results: [], errorMessage: null });
    try {
      if (term.length < 3) {
        this.setState({
          loading: false,
          errorMessage: 'API search result can be only by entering whole Pokémon name. Please...',
        });
        return;
      }

      const response = await fetch(API_URL + `${term}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({
        results: [{ name: data.name, description: data.species.url }],
        loading: false,
        searchTerm: term,
      });
      localStorage.setItem('searchTerm', term);
    } catch (error) {
      console.error('Error fetching results:', error);
      this.setState({
        loading: false,
        errorMessage: 'No results found for the given term',
      });
    }
  };

  handleSearch = (term: string) => {
    this.fetchResults(term);
  };

  handleError = (message: string) => {
    this.setState({ errorMessage: message });
  };

  triggerError = () => {
    this.setState({ throwError: true });
  };

  render() {
    const { results, loading, errorMessage } = this.state;

    return (
      <main>
        <header>
          <h1 className="top-head">
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              RESTfull api:
            </a>
            <img src={pokeApiLogo} alt="Poke Api" width="200" height="70" />
          </h1>
          <div className="top-head">
            <button onClick={this.triggerError}>Throw Error</button>
          </div>
        </header>
        <section>
          <Search onSearch={this.handleSearch} onError={this.handleError} />
        </section>
        <section>
          {loading && <p>Loading...</p>}
          {errorMessage && <p>{errorMessage}</p>}
          {!loading && !errorMessage && <ResultList results={results} errorMessage={errorMessage} />}
        </section>
      </main>
    );
  }
}

export default App;
