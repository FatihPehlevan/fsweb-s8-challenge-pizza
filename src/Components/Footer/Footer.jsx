import styles from './Footer.module.css';
import { hotMenuItems, instagramImages } from '../../data/data';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerItems}>
          <div className={styles.contact}>
            <h2>
              Teknolojik <br />
              Yemekler
            </h2>
            <ul>
              <li>
                <img
                  src="../images/iteration-2-images/footer/icons/icon-1.png"
                  alt=""
                />
                341 Londonderry Road, <br />
                Istanbul Türkiye
              </li>
              <li>
                <img
                  src="../images/iteration-2-images/footer/icons/icon-2.png"
                  alt=""
                />
                aciktim@teknolojikyemekler.com
              </li>
              <li>
                <img
                  src="../images/iteration-2-images/footer/icons/icon-3.png"
                  alt=""
                />
                +90 216 123 45 67
              </li>
            </ul>
          </div>

          <div className={styles.hotMenu}>
            <h3>Hot Menu</h3>
            <ul>
              {hotMenuItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.instagram}>
            <div>
              <h3>Instagram</h3>
            </div>
            <div className={styles.instagramImages}>
              {instagramImages.map((src, index) => (
                <img key={index} src={src} alt="" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className={styles.copyright}>
        <p>© 2023 Teknolojik Yemekler.</p>
        <i className="fa-brands fa-twitter"></i>
      </div>
    </footer>
  );
}
