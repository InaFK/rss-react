// import { useNavigate, useParams } from 'react-router-dom';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from '../../app/store';
// import DetailsPanel from './DetailsPanel';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(() => ({ itemName: 'pikachu' })),
    useNavigate: vi.fn(() => vi.fn()),
    useLocation: vi.fn(() => ({ search: '?page=1' })),
  };
});

// vi.mock('../../features/api', () => ({
//   api: {
//     reducerPath: 'api',
//     reducer: vi.fn(),
//   },
//   useGetItemByNameQuery: vi.fn(),
//   useGetItemSpeciesQuery: vi.fn(),
// }));


// import { useGetItemByNameQuery, useGetItemSpeciesQuery } from '../../features/api';

// const mockPokemonData = {
//   name: 'pikachu',
//   height: 4,
//   weight: 60,
//   abilities: [{ ability: { name: 'static' } }, { ability: { name: 'lightning-rod' } }],
//   sprites: { front_default: 'https://img.pokemondb.net/artwork/large/pikachu.jpg' },
// };

// const mockSpeciesData = {
//   flavor_text_entries: [{ flavor_text: 'It keeps its tail raised to monitor its surroundings.', language: { name: 'en' } }],
// };

describe.skip('DetailsPanel Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  // const renderWithProviders = () => {
  //   return render(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={['/details/pikachu?page=1']}>
  //         <Routes>
  //           <Route path="/details/:itemName" element={<DetailsPanel />} />
  //         </Routes>
  //       </MemoryRouter>
  //     </Provider>
  //   );
  // };

  // test.skip('renders "Select a Pokémon to view details." when no item is selected', () => {
  //   (useParams as vi.Mock).mockReturnValue({ itemName: undefined });
  //   renderWithProviders();
  //   expect(screen.getByText('Select a Pokémon to view details.')).toBeInTheDocument();
  // });

  // test.skip('displays "Loading details..." while fetching data', () => {
  //   (useGetItemByNameQuery as vi.Mock).mockReturnValue({ data: null, isLoading: true, error: null });
  //   (useGetItemSpeciesQuery as vi.Mock).mockReturnValue({ data: null, isLoading: true, error: null });

  //   renderWithProviders();

  //   expect(screen.getByText('Loading details...')).toBeInTheDocument();
  // });

  // test.skip('displays "Pokémon not found." when API returns an error', () => {
  //   (useGetItemByNameQuery as vi.Mock).mockReturnValue({ data: null, isLoading: false, error: true });
  //   (useGetItemSpeciesQuery as vi.Mock).mockReturnValue({ data: null, isLoading: false, error: true });

  //   renderWithProviders();

  //   expect(screen.getByText('Pokémon not found.')).toBeInTheDocument();
  // });

  // test.skip('displays Pokémon details when API data is available', async () => {
  //   (useGetItemByNameQuery as vi.Mock).mockReturnValue({ data: mockPokemonData, isLoading: false, error: null });
  //   (useGetItemSpeciesQuery as vi.Mock).mockReturnValue({ data: mockSpeciesData, isLoading: false, error: null });

  //   renderWithProviders();

  //   await waitFor(() => {
  //     expect(screen.getByText('pikachu')).toBeInTheDocument();
  //     expect(screen.getByText(/Height: 4/)).toBeInTheDocument();
  //     expect(screen.getByText(/Weight: 60/)).toBeInTheDocument();
  //     expect(screen.getByText(/Abilities: static, lightning-rod/)).toBeInTheDocument();
  //     expect(screen.getByAltText('pikachu')).toHaveAttribute('src', 'https://img.pokemondb.net/artwork/large/pikachu.jpg');
  //     expect(screen.getByText(/Description:/)).toHaveTextContent('It keeps its tail raised to monitor its surroundings.');
  //   });
  // });

  // test.skip('navigates back when close button is clicked', async () => {
  //   const mockNavigate = vi.fn();
  //   (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
  //   (useGetItemByNameQuery as vi.Mock).mockReturnValue({ data: mockPokemonData, isLoading: false, error: null });
  //   (useGetItemSpeciesQuery as vi.Mock).mockReturnValue({ data: mockSpeciesData, isLoading: false, error: null });

  //   renderWithProviders();

  //   const closeButton = screen.getByLabelText('Close Details');
  //   fireEvent.click(closeButton);

  //   await waitFor(() => {
  //     expect(mockNavigate).toHaveBeenCalledWith('/search?page=1');
  //   });
  // });
});
