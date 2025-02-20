import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ResultList from './ResultList';

describe('ResultList Component', () => {
  const mockOnSelect = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('displays loading indicator while fetching data', () => {
    render(<ResultList results={[]} loading={true} errorMessage={null} onSelect={mockOnSelect} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays error message when errorMessage is provided', () => {
    const errorMessage = 'Failed to fetch Pokémon data.';
    render(<ResultList results={[]} loading={false} errorMessage={errorMessage} onSelect={mockOnSelect} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders results and handles item click', () => {
    const results = [
      { name: 'Pikachu', description: 'An Electric-type Pokémon.' },
      { name: 'Charmander', description: 'A Fire-type Pokémon.' }
    ];

    render(<ResultList results={results} loading={false} errorMessage={null} onSelect={mockOnSelect} />);

    results.forEach(({ name, description }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Pikachu'));
    expect(mockOnSelect).toHaveBeenCalledWith(results[0]);
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  test('displays fallback message when there are no results and no error', () => {
    render(<ResultList results={[]} loading={false} errorMessage={null} onSelect={mockOnSelect} />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });
});
