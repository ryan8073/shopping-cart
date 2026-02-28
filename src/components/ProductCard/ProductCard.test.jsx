import { render, screen, fireEvent } from '@testing-library/react';
import { CartContext } from '../../context/CartContext';
import ProductCard from './ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test Product Title',
  price: 29.99,
  image: 'https://example.com/test.jpg',
  category: 'test category',
  rating: { rate: 4.2, count: 120 },
};

function renderProductCard(dispatchFn = vi.fn()) {
  return render(
    <CartContext.Provider value={{ dispatch: dispatchFn }}>
      <ProductCard product={mockProduct} />
    </CartContext.Provider>
  );
}

describe('ProductCard', () => {
  it('renders product title and price', () => {
    renderProductCard();
    expect(screen.getByText('Test Product Title')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  it('renders the product category', () => {
    renderProductCard();
    expect(screen.getByText('test category')).toBeInTheDocument();
  });

  it('renders quantity input with default value of 1', () => {
    renderProductCard();
    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(1);
  });

  it('increments quantity when + button is clicked', () => {
    renderProductCard();
    const incrementBtn = screen.getByRole('button', { name: /increase quantity/i });
    fireEvent.click(incrementBtn);
    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(2);
  });

  it('decrements quantity but not below 1', () => {
    renderProductCard();
    const decrementBtn = screen.getByRole('button', { name: /decrease quantity/i });
    fireEvent.click(decrementBtn);
    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(1);
  });

  it('dispatches ADD_ITEM with correct payload when Add to Cart is clicked', () => {
    const dispatch = vi.fn();
    renderProductCard(dispatch);
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_ITEM',
      payload: {
        id: 1,
        title: 'Test Product Title',
        price: 29.99,
        image: 'https://example.com/test.jpg',
        quantity: 1,
      },
    });
  });

  it('resets quantity to 1 after adding to cart', () => {
    renderProductCard();
    const incrementBtn = screen.getByRole('button', { name: /increase quantity/i });
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(3);

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(1);
  });
});
