import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const features = [
  {
    icon: '🚚',
    title: 'Free Shipping',
    description: 'On all orders over $50. Fast and reliable delivery to your door.',
  },
  {
    icon: '↩️',
    title: 'Easy Returns',
    description: '30-day hassle-free return policy. No questions asked.',
  },
  {
    icon: '🔒',
    title: 'Secure Checkout',
    description: 'Your payment information is always safe and encrypted.',
  },
];

function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Discover Products You&apos;ll Love
          </h1>
          <p className={styles.heroSubtitle}>
            Browse our curated collection of top-rated items across every category.
            Quality guaranteed, prices you&apos;ll love.
          </p>
          <Link to="/shop" className={styles.heroBtn}>
            Shop Now
          </Link>
        </div>
        <div className={styles.heroIllustration} aria-hidden="true">
          <div className={styles.heroCircle}>🛍️</div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>Why Shop With Us?</h2>
        <div className={styles.featureGrid}>
          {features.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureName}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to Start Shopping?</h2>
        <p>Explore hundreds of products across multiple categories.</p>
        <Link to="/shop" className={styles.ctaBtn}>
          Browse the Shop
        </Link>
      </section>
    </div>
  );
}

export default Home;
