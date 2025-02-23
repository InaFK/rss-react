import { render, screen } from '@testing-library/react';
import Search from './Search';

describe('Search Component', () => {
  test('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'bulbasaur');
    
    render(<Search onSearch={() => {}} onError={() => {}} />);
  
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toHaveValue('bulbasaur');
  });
});
