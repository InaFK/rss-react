import { useState, useEffect } from 'react';
import pokeApiLogo from './assets/pokeapi_256.3fa72200.png';
import Search from './components/Search/Search';
import ResultList from './components/ResultList/ResultList';
import useSearchQuery from './hooks/useSearchQuery';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const App = () => {
  const [results, setResults] = useState<{ name: string; description: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useSearchQuery();

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchResults(searchTerm);
    } else {
      fetchInitialResults();
    }
  }, [searchTerm]);

  const fetchInitialResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?limit=10&offset=0`);
      const data = await response.json();
      setResults(data.results.map((item: { name: string; url: string }) => ({
        name: item.name,
        description: item.url,
      })));
    } catch (error) {
      console.error('Error fetching initial results:', error);
    }
    setLoading(false);
  };

  const fetchResults = async (term: string) => {
    if (term.trim() === '') {
      fetchInitialResults();
      return;
    }

    if (term.length < 3) {
      setErrorMessage('API search result can be only by entering whole Pokémon name. Please...');
      return;
    }

    setLoading(true);
    setResults([]);
    setErrorMessage(null);
    try {
      const response = await fetch(`${API_URL}${term}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResults([{ name: data.name, description: data.species.url }]);
      setSearchTerm(term);
    } catch (error) {
      console.error('Error fetching results:', error);
      setErrorMessage('No results found for the given term');
    }
    setLoading(false);
  };

  return (
    <main>
      <header>
        <h1 className="top-head">
          <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
            RESTfull api:
          </a>
          <img src={pokeApiLogo} alt="Poke Api" width="200" height="70" />
        </h1>
      </header>
      <section>
        <Search onSearch={fetchResults} onError={setErrorMessage} />
      </section>
      <section>
        {loading && <p>Loading...</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {!loading && !errorMessage && <ResultList results={results} errorMessage={errorMessage} />}
      </section>
    </main>
  );
};

export default App;
