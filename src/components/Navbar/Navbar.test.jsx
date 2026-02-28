import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Navbar from './Navbar';

function renderNavbar(cartCount = 0) {
  return render(
    <CartContext.Provider value={{ cartCount }}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </CartContext.Provider>
  );
}

describe('Navbar', () => {
  it('renders navigation links', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shop' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Cart' })).toBeInTheDocument();
  });

  it('does not show cart badge when cart is empty', () => {
    renderNavbar(0);
    expect(screen.queryByLabelText(/items in cart/i)).not.toBeInTheDocument();
  });

  it('shows cart badge with correct count when items are in cart', () => {
    renderNavbar(3);
    expect(screen.getByLabelText('3 items in cart')).toBeInTheDocument();
    expect(screen.getByLabelText('3 items in cart')).toHaveTextContent('3');
  });

  it('updates badge when cart count changes', () => {
    const { rerender } = render(
      <CartContext.Provider value={{ cartCount: 1 }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(screen.getByLabelText('1 items in cart')).toBeInTheDocument();

    rerender(
      <CartContext.Provider value={{ cartCount: 5 }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </CartContext.Provider>
    );
    expect(screen.getByLabelText('5 items in cart')).toBeInTheDocument();
  });
});
