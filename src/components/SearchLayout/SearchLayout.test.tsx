import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import SearchLayout from './SearchLayout';
//import { rest } from 'msw';
//import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

// const server = setupServer(
//   rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
//     return res(
//       ctx.json({
//         count: 100,
//         results: [
//           { name: 'bulbasaur' },
//           { name: 'charmander' },
//           { name: 'squirtle' },
//         ],
//       })
//     );
//   }),
//   rest.get('https://pokeapi.co/api/v2/pokemon/:name', (req, res, ctx) => {
//     return res(
//       ctx.json({
//         name: req.params.name,
//         height: 7,
//         weight: 69,
//       })
//     );
//   })
// );

const renderWithProviders = (ui: React.ReactElement, route = '/search') => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/search/*" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

describe.skip('SearchLayout Component', () => {
  test('renders SearchLayout with header and search input', () => {
    renderWithProviders(<SearchLayout />);
    expect(screen.getByText(/RESTful API:/)).toBeInTheDocument();
    expect(screen.getByAltText('Poke Api')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test.skip('fetches and displays Pokémon list', async () => {
    renderWithProviders(<SearchLayout />);
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('charmander')).toBeInTheDocument();
      expect(screen.getByText('squirtle')).toBeInTheDocument();
    });
  });

  test('searching for a Pokémon updates the result list', async () => {
    renderWithProviders(<SearchLayout />);
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      expect(screen.getByText(/Height: 7, Weight: 69/)).toBeInTheDocument();
    });
  });

  test('clicking pagination updates the page', async () => {
    renderWithProviders(<SearchLayout />);
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    const nextPageButton = screen.getByText('2');
    fireEvent.click(nextPageButton);
    await waitFor(() => {
      expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
  });

  test('clicking on a Pokémon selects it and navigates to details page', async () => {
    renderWithProviders(<SearchLayout />);
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('bulbasaur'));
    await waitFor(() => {
      expect(screen.getByText(/Height: 7, Weight: 69/)).toBeInTheDocument();
    });
  });
});
