import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useGetPokemonListQuery, useGetPokemonByNameQuery } from '../../features/pokemonApi';
import pokeApiLogo from '../../assets/pokeapi_256.3fa72200.png';
import Search from '../Search/Search';
import ResultList from '../ResultList/ResultList';
import Pagination from '../Pagination/Pagination';
import useSearchQuery from '../../hooks/useSearchQuery';
import './SearchLayout.css';

const itemsPerPage = 10;

const SearchLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page') || '1';
  const currentPage = parseInt(pageParam, 10);

  const [searchTerm, setSearchTerm] = useSearchQuery();

  const {
    data: pokemonListData,
    isLoading: listLoading,
    error: listError,
  } = useGetPokemonListQuery(
    { limit: itemsPerPage, offset: (currentPage - 1) * itemsPerPage },
    { skip: !!searchTerm }
  );

  const {
    data: searchedPokemonData,
    isLoading: searchLoading,
    error: searchError,
  } = useGetPokemonByNameQuery(searchTerm, { skip: !searchTerm });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    navigate(`/search?page=1`);
  };

  const handleSelect = (pokemon: { name: string; description: string }) => {
    navigate(`/search/${pokemon.name}`);
  };

  const results = searchTerm
    ? searchedPokemonData
      ? [{ name: searchedPokemonData.name, description: `Height: ${searchedPokemonData.height}, Weight: ${searchedPokemonData.weight}` }]
      : []
    : pokemonListData?.results?.map((poke: { name: string }) => ({
        name: poke.name,
        description: 'Click for more details',
      })) ?? [];

  const totalPages = pokemonListData ? Math.ceil(pokemonListData.count / itemsPerPage) : 1;

  return (
    <>
      <header>
        <h1 className="header">
          <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
            RESTful API:
          </a>
          <img src={pokeApiLogo} alt="Poke Api" width="200" height="70" />
        </h1>
      </header>
      <main>
        <div className="container">
          <Search onSearch={handleSearch} onError={() => {}} />
          {(searchError || listError) && <p className="error">Error loading Pokémon data.</p>}
        </div>
        <div className="container">
          <div className="search-layout">
            <div className="result-container">
              <ResultList
                results={results}
                errorMessage={searchError || listError ? 'Error loading results' : null}
                loading={listLoading || searchLoading}
                onSelect={handleSelect}
              />
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
