import PropTypes from 'prop-types';
import styles from './CartItem.module.css';

function CartItem({ item, dispatch }) {
  const handleDecrement = () => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: item.id, quantity: item.quantity - 1 },
    });
  };

  const handleIncrement = () => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: item.id, quantity: item.quantity + 1 },
    });
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: item.id, quantity: val },
      });
    }
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
  };

  return (
    <div className={styles.item}>
      <img src={item.image} alt={item.title} className={styles.image} />
      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.unitPrice}>${item.price.toFixed(2)} each</p>
      </div>
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
          value={item.quantity}
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
      <p className={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</p>
      <button
        className={styles.removeBtn}
        onClick={handleRemove}
        aria-label={`Remove ${item.title}`}
      >
        ✕
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default CartItem;
