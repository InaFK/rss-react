import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import pokeApiLogo from './assets/pokeapi_256.3fa72200.png';
import Search from './components/Search/Search';
import ResultList from './components/ResultList/ResultList';
import useSearchQuery from './hooks/useSearchQuery';
import Pagination from './components/Pagination/Pagination';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:page" element={<SearchResults />} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h1><a href='/search/:page'>Welcome to the Poke API Search!</a></h1>
    </div>
  );
};

const SearchResults = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  
  const [results, setResults] = useState<{ name: string; description: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useSearchQuery();
  const itemsPerPage = 10;

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchResults(searchTerm, page);
    } else {
      fetchInitialResults(page);
    }
  }, [searchTerm, page]);

  const fetchInitialResults = async (page: string | undefined) => {
    setLoading(true);
    try {
      const offset = page ? (parseInt(page) - 1) * itemsPerPage : 0;
      const response = await fetch(`${API_URL}?limit=${itemsPerPage}&offset=${offset}`);
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

  const fetchResults = async (term: string, page: string | undefined) => {
    if (term.trim() === '') {
      fetchInitialResults(page);
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

  const handlePageChange = (newPage: number) => {
    navigate(`/search/${newPage}`);
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
        <Pagination currentPage={parseInt(page) || 1} onPageChange={handlePageChange} />
      </section>
    </main>
  );
};

export default App;
