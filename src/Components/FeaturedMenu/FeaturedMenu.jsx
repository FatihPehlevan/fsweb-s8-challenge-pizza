import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './FeaturedMenu.module.css';
import CategoryFilters from '../CategoryFilters/CategoryFilters';
import MenuCard from '../MenuCard/MenuCard';

export default function FeaturedMenu() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get('/menuItems.json')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  return (
    <section className={styles.menuSectionContainer}>
      <div className={styles.menuSection}>
        <p>en çok paketlenen menüler</p>
        <h2>Acıktıran Kodlara Doyuran Lezzetler</h2>

        <CategoryFilters />

        <div className={styles.products}>
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
