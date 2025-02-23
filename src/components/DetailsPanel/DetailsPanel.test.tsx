import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailsPanel from './DetailsPanel';

const renderWithRoute = (initialRoute = '/search') => {
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/search" element={<DetailsPanel />} />
        <Route path="/search/:pokemonName" element={<DetailsPanel />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('DetailsPanel', () => {
  it('displays default message if no Pokémon is selected', () => {
    renderWithRoute();
    expect(screen.getByText(/select a pokémon to view details./i)).toBeInTheDocument();
  });
});
