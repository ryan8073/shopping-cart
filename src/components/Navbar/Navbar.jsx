import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        ShopReact
      </NavLink>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Cart
            {cartCount > 0 && (
              <span className={styles.badge} aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
