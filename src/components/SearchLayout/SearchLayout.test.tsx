import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchLayout from './SearchLayout';

describe('SearchLayout', () => {
  test('renders header and search input', () => {
    render(
      <MemoryRouter>
        <SearchLayout />
      </MemoryRouter>
    );
    expect(screen.getByAltText('Poke Api')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Pokémon')).toBeInTheDocument();
  });

  test('displays error message when no results found', async () => {
    render(
      <MemoryRouter>
        <SearchLayout />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search Pokémon');
    fireEvent.change(input, { target: { value: 'nonexistentmon' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(await screen.findByText('No Pokémon found with that name.')).toBeInTheDocument();
  });
});
