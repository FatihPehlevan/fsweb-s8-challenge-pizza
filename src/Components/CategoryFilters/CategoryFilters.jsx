import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CategoryFilters.module.css';

export default function CategoryFilters() {
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    axios
      .get('/categories.json')
      .then((response) => {
        setCategoryData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
      });
  }, []);

  return (
    <div className={styles.filters}>
      <ul>
        {categoryData.map((category, index) => (
          <li
            key={index}
            className={category.active ? styles.active : undefined}
          >
            <img src={category.icon} alt={category.label} />
            <a href="#">{category.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
