import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import { vi } from 'vitest';

describe('Pagination Component', () => {
  test('renders correctly with given props', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />);

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  test('disables "Previous" button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
    
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  test('disables "Next" button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />);
    
    expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  test('calls onPageChange with correct values when buttons are clicked', () => {
    const mockOnPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });
});
