import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import pokeApiLogo from '../../assets/pokeapi_256.3fa72200.png';
import Search from '../Search/Search';
import ResultList from '../ResultList/ResultList';
import Pagination from '../Pagination/Pagination';
import useSearchQuery from '../../hooks/useSearchQuery';
import './SearchLayout.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const itemsPerPage = 10;

interface PokemonResult {
  name: string;
  description: string;
}

const SearchLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page') || '1';
  const currentPage = parseInt(pageParam, 10);
  const [results, setResults] = useState<PokemonResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useSearchQuery();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setErrorMessage(null);
  
      try {
        if (searchTerm) {
          const response = await fetch(`${API_URL}${searchTerm.toLowerCase()}`);
          if (!response.ok) throw new Error('Pokémon not found.');
  
          const data = await response.json();
          setResults([data]);
          setTotalPages(1);
        } else {
          const offset = (currentPage - 1) * itemsPerPage;
          const response = await fetch(`${API_URL}?limit=${itemsPerPage}&offset=${offset}`);
          const data = await response.json();
  
          setResults(data.results);
          setTotalPages(Math.ceil(data.count / itemsPerPage));
        }
      } catch (err) {
        setResults([]);
        setErrorMessage(searchTerm ? 'No Pokémon found with that name.' : 'Failed to load Pokémon list.');
      }
  
      setLoading(false);
    };
  
    fetchResults();
  }, [searchTerm, currentPage]);
  

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    navigate(`/search?page=1`);
  };

  return (
    <>
      <header>
        <h1 className="header">
          <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
            RESTfull api:
          </a>
          <img src={pokeApiLogo} alt="Poke Api" width="200" height="70" />
        </h1>
      </header>
      <main>
        <div className="container">
          <Search onSearch={handleSearch} onError={setErrorMessage} />
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
        <div className="container">
          <div className="search-layout">
            <div className="result-container">
              <ResultList results={results} errorMessage={null} loading={loading} onSelect={(pokemon) => navigate(`/search/${pokemon.name}`)} />
              {!searchTerm && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => navigate(`/search?page=${page}`)}
                />
              )}
            </div>
            <aside className="details-panel">
              <Outlet />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchLayout;
