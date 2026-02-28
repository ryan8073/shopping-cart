import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './CartItem';

const mockItem = {
  id: 1,
  title: 'Cart Test Item',
  price: 19.99,
  image: 'https://example.com/item.jpg',
  quantity: 2,
};

describe('CartItem', () => {
  it('renders item title and price', () => {
    render(<CartItem item={mockItem} dispatch={vi.fn()} />);
    expect(screen.getByText('Cart Test Item')).toBeInTheDocument();
    expect(screen.getByText('$19.99 each')).toBeInTheDocument();
  });

  it('renders subtotal correctly', () => {
    render(<CartItem item={mockItem} dispatch={vi.fn()} />);
    expect(screen.getByText('$39.98')).toBeInTheDocument();
  });

  it('renders quantity in the input', () => {
    render(<CartItem item={mockItem} dispatch={vi.fn()} />);
    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(2);
  });

  it('dispatches UPDATE_QUANTITY with increased quantity on increment', () => {
    const dispatch = vi.fn();
    render(<CartItem item={mockItem} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /increase quantity/i }));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_QUANTITY',
      payload: { id: 1, quantity: 3 },
    });
  });

  it('dispatches UPDATE_QUANTITY with decreased quantity on decrement', () => {
    const dispatch = vi.fn();
    render(<CartItem item={mockItem} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /decrease quantity/i }));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_QUANTITY',
      payload: { id: 1, quantity: 1 },
    });
  });

  it('dispatches REMOVE_ITEM when remove button is clicked', () => {
    const dispatch = vi.fn();
    render(<CartItem item={mockItem} dispatch={dispatch} />);
    fireEvent.click(screen.getByRole('button', { name: /remove cart test item/i }));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_ITEM',
      payload: { id: 1 },
    });
  });
});
