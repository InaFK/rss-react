import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import ResultList from './ResultList';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

const mockOnSelect = vi.fn();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

describe('ResultList Component', () => {
  
  test('displays loading text when loading is true', () => {
    renderWithProviders(<ResultList results={[]} errorMessage={null} loading={true} onSelect={mockOnSelect} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message when provided', () => {
    renderWithProviders(<ResultList results={[]} errorMessage="Error loading data" loading={false} onSelect={mockOnSelect} />);
    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  test('displays list of results', () => {
    const mockResults = [
      { name: 'Bulbasaur', description: 'A grass-type Pokémon.' },
      { name: 'Charmander', description: 'A fire-type Pokémon.' },
    ];

    renderWithProviders(<ResultList results={mockResults} errorMessage={null} loading={false} onSelect={mockOnSelect} />);

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('A grass-type Pokémon.')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('A fire-type Pokémon.')).toBeInTheDocument();
  });

  test('calls onSelect function when a result item is clicked', () => {
    const mockResults = [{ name: 'Bulbasaur', description: 'A grass-type Pokémon.' }];

    renderWithProviders(<ResultList results={mockResults} errorMessage={null} loading={false} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByText('Bulbasaur'));
    expect(mockOnSelect).toHaveBeenCalledWith({ name: 'Bulbasaur', description: 'A grass-type Pokémon.' });
  });

  test('checkbox toggles selection state', () => {
    const mockResults = [{ name: 'Bulbasaur', description: 'A grass-type Pokémon.' }];

    renderWithProviders(<ResultList results={mockResults} errorMessage={null} loading={false} onSelect={mockOnSelect} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('displays "No results found" when no results are available', () => {
    renderWithProviders(<ResultList results={[]} errorMessage={null} loading={false} onSelect={mockOnSelect} />);
    expect(screen.getByText('No results found. Please try searching for a full Pokémon name.')).toBeInTheDocument();
  });

});
