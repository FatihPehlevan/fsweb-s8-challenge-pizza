import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import styles from './SuccessPage.module.css';
import { Link } from 'react-router-dom';

export default function SuccessPage({ order }) {
  if (!order) {
    return (
      <div className={styles.success}>
        <p className={styles.empty}>
          Sipariş bulunamadı.{' '}
          <Link to="/order">Sipariş vermek için tıkla.</Link>
        </p>
      </div>
    );
  }

  const { boyut, hamur, malzemeler, secimlerToplami, toplam } = order;

  return (
    <>
      <Header />
      <div className={styles.success}>
        <p className={styles.tagline}>lezzetin yolda</p>
        <h1 className={styles.title}>SİPARİŞ ALINDI</h1>
        <hr className={styles.divider} />

        <p className={styles.productName}>Position Absolute Acı Pizza</p>

        <div className={styles.orderInfo}>
          <p className={styles.infoRow}>
            <span className={styles.label}>Boyut:</span>
            <span className={styles.value}>{boyut}</span>
          </p>
          <p className={styles.infoRow}>
            <span className={styles.label}>Hamur:</span>
            <span className={styles.value}>{hamur}</span>
          </p>
          <p className={styles.infoRow}>
            <span className={styles.label}>Ek Malzemeler:</span>
            <span className={styles.value}>{malzemeler.join(', ')}</span>
          </p>
        </div>

        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Sipariş Toplamı</h3>
          <div className={styles.summaryRow}>
            <span>Seçimler</span>
            <span>{Number(secimlerToplami).toFixed(2)}₺</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Toplam</span>
            <span>{Number(toplam).toFixed(2)}₺</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
