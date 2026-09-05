import styles from './MenuCard.module.css';

export default function MenuCard({ item }) {
  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.name} />
      <div className={styles.cardDetails}>
        <h3>{item.name}</h3>
        <div className={styles.cardNumbers}>
          <p>{item.rating}</p>
          <p>({item.reviews})</p>
          <p>
            <span>{item.price}₺</span>
          </p>
        </div>
      </div>
    </div>
  );
}
