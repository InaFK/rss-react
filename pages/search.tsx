import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { wrapper } from '@/store'; // adj
import { useGetItemListQuery } from '@/features/api'; // adj
import { setPage } from '@/features/currentPageSlice'; // adj
import { selectItem } from '@/features/selectedItemsSlice'; // adj
import Search from '@/components/Search/Search'; // adj
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'; // adj
import ResultList from '@/components/ResultList/ResultList'; // adj
import Pagination from '@/components/Pagination/Pagination'; // adj
import useSearchQuery from '@/hooks/useSearchQuery'; // adj
import SelectedItemsFlyout from '@/components/SelectedItemsFlyout/SelectedItemsFlyout'; // adj
import apiLogo from '@/assets/pokeapi_256.3fa72200.png'; // adj
import '@/components/SearchLayout/SearchLayout.css'; // adj

const REST_API_URL = "https://pokeapi.co/";
const ITEMS_PER_PAGE = 10;

const SearchPage = ({ initialData, totalCount }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { page = '1' } = router.query;
  const currentPage = parseInt(page as string, 10);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const [searchTerm, setSearchTerm] = useSearchQuery();

  useEffect(() => {
    dispatch(setPage(currentPage));
  }, [currentPage, dispatch]);

  const { data: pokemonListData, isLoading: listLoading, error: listError } = useGetItemListQuery(
    { limit: ITEMS_PER_PAGE, offset },
    { skip: !!searchTerm || !!initialData, refetchOnMountOrArgChange: true }
  );

  const results = searchTerm
    ? initialData?.searchedItem
      ? [{ name: initialData.searchedItem.name, description: `Height: ${initialData.searchedItem.height}, Weight: ${initialData.searchedItem.weight}` }]
      : []
    : initialData?.pokemonList?.results?.map((poke: { name: string }) => ({
        name: poke.name,
        description: 'Click for more details',
      })) ?? pokemonListData?.results?.map((poke: { name: string }) => ({
        name: poke.name,
        description: 'Click for more details',
      })) ?? [];

  const totalPages = totalCount ? Math.ceil(totalCount / ITEMS_PER_PAGE) : 1;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    dispatch(setPage(1));
    router.push(`/search?page=1`);
  };

  const handleSelect = (item: { name: string; description: string }) => {
    dispatch(selectItem({ id: item.name, name: item.name, description: item.description, detailsUrl: `/search/${item.name}?page=${currentPage}` }));
    router.push(`/search/${item.name}?page=${currentPage}`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/search?page=${page}`);
  };

  return (
    <>
      <header>
        <h1 className="header">
          <a href={REST_API_URL} target="_blank" rel="noopener noreferrer">
            RESTful API:
          </a>
          <Image src={apiLogo} alt="Poke Api" width={200} height={70} />
        </h1>
        <ThemeSwitcher />
      </header>
      <main>
        <div className="container">
          <Search onSearch={handleSearch} onError={() => {}} />
          {(initialData?.error || listError) && <p className="error">Error loading data.</p>}
        </div>
        <div className="container">
          <div className="search-layout">
            <div className="result-container">
              <ResultList
                results={results}
                errorMessage={initialData?.error || listError ? 'Error loading results' : null}
                loading={listLoading}
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
              {/* No Outlet here; details are handled by /search/[itemName] */}
            </aside>
          </div>
        </div>
        <SelectedItemsFlyout />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page = '1', search: searchTerm } = context.query;
    const currentPage = parseInt(page as string, 10);
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    let pokemonList = null;
    let searchedItem = null;
    let totalCount = 0;
    let error = null;

    try {
      if (searchTerm) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        if (response.ok) {
          searchedItem = await response.json();
        } else {
          error = 'Search item not found';
        }
      } else {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
        if (response.ok) {
          pokemonList = await response.json();
          totalCount = pokemonList.count;
        } else {
          error = 'Error fetching list';
        }
      }
    } catch (err) {
      error = err.message;
    }

    return {
      props: {
        initialData: { pokemonList, searchedItem, error },
        totalCount,
      },
    };
  }
);

export default SearchPage;