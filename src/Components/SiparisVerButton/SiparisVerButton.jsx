import { Link } from 'react-router-dom';
import styles from './SiparisVerButton.module.css';
export default function SiparisVerButton({ marginTop }) {
  return (
    <Link
      to="/order"
      className={styles.siparisVerButton}
      style={
        marginTop !== undefined ? { marginTop: `${marginTop}rem` } : undefined
      }
    >
      SİPARİŞ VER
    </Link>
  );
}
