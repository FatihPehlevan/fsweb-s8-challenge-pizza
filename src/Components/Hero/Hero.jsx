import styles from './Hero.module.css';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <header className={styles.header}>
      <div className={styles.heroContent}>
        <h2>Teknolojik Yemekler</h2>
        <p>fırsatı kaçırma</p>
        <h1>
          KOD ACIKTIRIR <br />
          PIZZA, DOYURUR
        </h1>
        <Link to="/order">ACIKTIM</Link>
      </div>
      <img
        src="../images/iteration-1-images/home-banner.png"
        alt="hero-banner"
        className={styles.homeBanner}
      />
    </header>
  );
}
