import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Search from './Search';

describe('Search Component', () => {
  it('renders search input and button', () => {
    render(<Search onSearch={vi.fn()} onError={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search Pokémon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates the input value when typing', () => {
    render(<Search onSearch={vi.fn()} onError={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search Pokémon') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Pikachu' } });

    expect(input.value).toBe('Pikachu');
  });

  it('calls onSearch when clicking the search button with valid input', () => {
    const onSearchMock = vi.fn();
    render(<Search onSearch={onSearchMock} onError={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search Pokémon');
    fireEvent.change(input, { target: { value: 'Bulbasaur' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('Bulbasaur');
  });

  it('calls onSearch when pressing Enter key with valid input', () => {
    const onSearchMock = vi.fn();
    render(<Search onSearch={onSearchMock} onError={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search Pokémon');
    fireEvent.change(input, { target: { value: 'Charmander' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSearchMock).toHaveBeenCalledWith('Charmander');
  });

  it.skip('calls onError when entering an invalid search term', () => {
    const onErrorMock = vi.fn();
    render(<Search onSearch={vi.fn()} onError={onErrorMock} />);

    const input = screen.getByPlaceholderText('Search Pokémon');
    fireEvent.change(input, { target: { value: '' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(onErrorMock).toHaveBeenCalledTimes(1);
    expect(onErrorMock).toHaveBeenCalledWith(
      'API search result can only be fetched by entering a whole Pokémon name.'
    );
  });
});
