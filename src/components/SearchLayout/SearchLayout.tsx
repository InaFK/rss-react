import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet, useParams } from 'react-router-dom';
import { useGetItemListQuery, useGetItemByNameQuery } from '../../features/api';
import apiLogo from '../../assets/pokeapi_256.3fa72200.png';
import { useAppDispatch } from '../../app/hooks';
import { setPage } from '../../features/currentPageSlice';
import { selectItem } from '../../features/selectedItemsSlice';
import Search from '../Search/Search';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import ResultList from '../ResultList/ResultList';
import Pagination from '../Pagination/Pagination';
import useSearchQuery from '../../hooks/useSearchQuery';
import SelectedItemsFlyout from '../SelectedItemsFlyout/SelectedItemsFlyout';
import './SearchLayout.css';

const REST_API_URL = "https://pokeapi.co/";
const ITEMS_PER_PAGE = 10;

const SearchLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { itemName } = useParams<{itemName?: string }>();
  const [searchTerm, setSearchTerm] = useSearchQuery();

  useEffect(() => {
    const pageFromUrl = parseInt(new URLSearchParams(location.search).get('page') || '1', 10);
    if (pageFromUrl !== currentPage) {
      dispatch(setPage(pageFromUrl));
    }
  }, [location.search, currentPage, dispatch]);

  useEffect(() => {
    if (itemName) {
      dispatch(selectItem({ id: itemName, name: itemName, description: itemName, detailsUrl: `/search/${itemName}?page=${currentPage}` }));
    }
  }, [itemName, currentPage, dispatch]);

  const {
    data: pokemonListData,
    isLoading: listLoading,
    error: listError,
  } = useGetItemListQuery(
    { limit: ITEMS_PER_PAGE, offset },
    { skip: !!searchTerm, refetchOnMountOrArgChange: true }
  );

  const {
    data: searchedItemData,
    isLoading: searchLoading,
    error: searchError,
  } = useGetItemByNameQuery(searchTerm, { skip: !searchTerm });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    dispatch(setPage(1));
    navigate(`/search?page=1`);
  };

  const handleSelect = (item: { name: string; description: string }) => {
    dispatch(selectItem({ id: item.name, name: item.name, description: item.description, detailsUrl: `/search/${item.name}?page=${currentPage}` }));
    navigate(`/search/${item.name}?page=${currentPage}`);
  };

  const handlePageChange = (page: number) => {
    const newPath = itemName ? `/search/${itemName}?page=${page}` : `/search?page=${page}`;
    navigate(newPath);
  };

  const results = searchTerm
    ? searchedItemData
      ? [{ name: searchedItemData.name, description: `Height: ${searchedItemData.height}, Weight: ${searchedItemData.weight}` }]
      : []
    : pokemonListData?.results?.map((poke: { name: string }) => ({
        name: poke.name,
        description: 'Click for more details',
      })) ?? [];

  const totalPages = pokemonListData ? Math.ceil(pokemonListData.count / ITEMS_PER_PAGE) : 1;

  return (
    <>
      <header>
        <h1 className="header">
          <a href={REST_API_URL} target="_blank" rel="noopener noreferrer">
            RESTful API:
          </a>
          <img src={apiLogo} alt="Poke Api" width="200" height="70" />
        </h1>
        <ThemeSwitcher />
      </header>
      <main>
        <div className="container">
          <Search onSearch={handleSearch} onError={() => {}} />
          {(searchError || listError) && <p className="error">Error loading data.</p>}
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
                  onPageChange={handlePageChange}
                />
              )}
            </div>
            <aside className="details-panel">
              <Outlet />
            </aside>
          </div>
        </div>
        <SelectedItemsFlyout />
      </main>
    </>
  );
};

export default SearchLayout;
