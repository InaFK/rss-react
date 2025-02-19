import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import pokeApiLogo from './assets/pokeapi_256.3fa72200.png';
import Search from './components/Search/Search';
import ResultList from './components/ResultList/ResultList';
import Pagination from './components/Pagination/Pagination';
import DetailsPanel from './components/DetailsPanel/DetailsPanel';
import useSearchQuery from './hooks/useSearchQuery';
import NotFound from './pages/NotFound';
import './App.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h1><a href='/search?page=1'>Welcome to the Poke API Search!</a></h1>
    </div>
  );
};

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page') || '1';
  const [results, setResults] = useState<{ name: string; description: string }[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<{ name: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useSearchQuery();
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const currentPage = Number.isNaN(Number(pageParam)) ? 1 : parseInt(pageParam, 10);

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchResultsWithPage(searchTerm, pageParam);
    } else {
      fetchInitialResults(pageParam);
    }
  }, [searchTerm, pageParam]);

  const fetchInitialResults = async (page: string) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const offset = (parseInt(page, 10) - 1) * itemsPerPage;
      const response = await fetch(`${API_URL}?limit=${itemsPerPage}&offset=${offset}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setResults(data.results.map((item: { name: string; url: string }) => ({
        name: item.name,
        description: item.url,
      })));

      setTotalPages(Math.ceil(data.count / itemsPerPage));
    } catch (error) {
      console.error('Error fetching initial results:', error);
      setErrorMessage('Failed to load Pokémon list.');
    }
    
    setLoading(false);
  };

  const fetchResultsWithPage = async (term: string, page: string) => {
    if (term.trim() === '') {
      fetchInitialResults(page);
      return;
    }

    if (term.length < 3) {
      setErrorMessage('API search result can be only by entering whole Pokémon name.');
      return;
    }

    setLoading(true);
    setResults([]);
    setErrorMessage(null);

    try {
      const response = await fetch(`${API_URL}${term.toLowerCase()}`);
      if (!response.ok) throw new Error('Not found');
      const data = await response.json();

      setResults([{ name: data.name, description: data.species.url }]);
      setSearchTerm(term);

      if (data) {
        navigate(`/search?page=1`, { replace: true });
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      setErrorMessage('No results found for the given term');
    }

    setLoading(false);
  };

  const handlePageChange = (newPage: number) => {
    if (searchTerm.trim()) {
      navigate(`/search?page=${newPage}`);
    } else {
      if (newPage !== 1 && totalPages > 1) {
        navigate(`/search?page=${newPage}`);
      } else {
        navigate(`/search?page=1`);
      }
    }
  };

  const handleSelect = (pokemon: { name: string; description: string }) => {
    setSelectedPokemon(pokemon);
  };

  const handleClosePanel = () => {
    setSelectedPokemon(null);
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
        <Search 
          onSearch={(term: string) => fetchResultsWithPage(term, pageParam)} 
          onError={setErrorMessage} 
        />
      </section>
      <section>
        <div>
          {errorMessage && <p className="error">{errorMessage}</p>}
            <ResultList results={results} errorMessage={null} loading={loading} onSelect={handleSelect} />
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </div>
      </section>
      <DetailsPanel pokemon={selectedPokemon} onClose={handleClosePanel} />
    </main>
  );
};

export default App;
