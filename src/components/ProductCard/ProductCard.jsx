import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const handleDecrement = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrement = () => {
    setQuantity((q) => q + 1);
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) {
      setQuantity(val);
    }
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      },
    });
    setQuantity(1);
  };

  const stars = Math.round(product.rating.rate);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h2 className={styles.title}>{product.title}</h2>
        <div className={styles.rating} aria-label={`Rating: ${product.rating.rate} out of 5`}>
          {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
          <span className={styles.ratingCount}>({product.rating.count})</span>
        </div>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <div className={styles.controls}>
          <button
            className={styles.qtyBtn}
            onClick={handleDecrement}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            className={styles.qtyInput}
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            aria-label="Quantity"
          />
          <button
            className={styles.qtyBtn}
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button className={styles.addBtn} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductCard;
