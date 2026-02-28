import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Shop from './Shop';

const mockProducts = [
  {
    id: 1,
    title: 'Product One',
    price: 9.99,
    image: 'https://example.com/1.jpg',
    category: 'electronics',
    rating: { rate: 4.0, count: 50 },
  },
  {
    id: 2,
    title: 'Product Two',
    price: 19.99,
    image: 'https://example.com/2.jpg',
    category: 'clothing',
    rating: { rate: 3.5, count: 30 },
  },
];

function renderShop() {
  return render(
    <CartContext.Provider value={{ dispatch: vi.fn() }}>
      <MemoryRouter>
        <Shop />
      </MemoryRouter>
    </CartContext.Provider>
  );
}

describe('Shop', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows loading state initially', () => {
    fetch.mockReturnValue(new Promise(() => {}));
    renderShop();
    expect(screen.getByLabelText(/loading products/i)).toBeInTheDocument();
  });

  it('renders product cards after successful fetch', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
    renderShop();
    await waitFor(() => {
      expect(screen.getByText('Product One')).toBeInTheDocument();
      expect(screen.getByText('Product Two')).toBeInTheDocument();
    });
  });

  it('shows error message on fetch failure', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    renderShop();
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch products/i)).toBeInTheDocument();
    });
  });

  it('displays the item count after loading', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
    renderShop();
    await waitFor(() => {
      expect(screen.getByText('2 items available')).toBeInTheDocument();
    });
  });
});
