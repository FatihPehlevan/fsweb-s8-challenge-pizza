import SiparisVerButton from '../SiparisVerButton/SiparisVerButton';
import styles from './Promos.module.css';

export default function Promos() {
  return (
    <section className={styles.promos}>
      <div className={styles.promosLeft}>
        <img src="../images/iteration-2-images/cta/kart-1.png" />
        <div className={styles.promosLeftText}>
          <h2>Özel</h2>
          <h2>Lezzetus</h2>
          <p>Position: Absolute Acı Burger</p>
          <SiparisVerButton marginTop={0.75} />
        </div>
      </div>

      <div className={styles.promosRight}>
        <div>
          <img src="../images/iteration-2-images/cta/kart-2.png" />
          <div className={styles.promosRightTopText}>
            <h3>Hackathlon</h3>
            <h3>Burger Menü</h3>
            <SiparisVerButton />
          </div>
        </div>
        <div className={styles.bottom}>
          <img src="../images/iteration-2-images/cta/kart-3.png" />
          <div className={styles.promosRightBottomText}>
            <h3>
              <span>Çoooook</span> hızlı
            </h3>
            <h3>npm gibi kurye</h3>
            <SiparisVerButton />
          </div>
        </div>
      </div>
    </section>
  );
}
