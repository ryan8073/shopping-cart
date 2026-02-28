import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Cart from './Cart';

const mockItems = [
  { id: 1, title: 'Item Alpha', price: 10.0, image: 'https://example.com/a.jpg', quantity: 2 },
  { id: 2, title: 'Item Beta', price: 5.5, image: 'https://example.com/b.jpg', quantity: 1 },
];

function renderCart(cartItems = [], dispatch = vi.fn()) {
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  return render(
    <CartContext.Provider value={{ cartItems, cartCount, dispatch }}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </CartContext.Provider>
  );
}

describe('Cart', () => {
  it('shows empty state message when cart is empty', () => {
    renderCart([]);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start shopping/i })).toBeInTheDocument();
  });

  it('renders cart items when cart has products', () => {
    renderCart(mockItems);
    expect(screen.getByText('Item Alpha')).toBeInTheDocument();
    expect(screen.getByText('Item Beta')).toBeInTheDocument();
  });

  it('displays correct total price', () => {
    renderCart(mockItems);
    // 10 * 2 + 5.5 * 1 = 25.50
    expect(screen.getAllByText('$25.50')).toHaveLength(2); // summary rows
  });

  it('shows item count in summary', () => {
    renderCart(mockItems);
    expect(screen.getByText(/items \(3\)/i)).toBeInTheDocument();
  });

  it('dispatches CLEAR_CART when clear button is clicked', () => {
    const dispatch = vi.fn();
    renderCart(mockItems, dispatch);
    fireEvent.click(screen.getByRole('button', { name: /clear cart/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: 'CLEAR_CART' });
  });
});
