import { render, screen } from '@testing-library/react';
import ResultList from './ResultList';

describe('ResultList Component', () => {
  test('displays loading indicator while fetching data', () => {
    render(<ResultList results={[]} loading={true} errorMessage={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
