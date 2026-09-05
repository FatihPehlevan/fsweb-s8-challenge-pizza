import styles from './Navigation.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavItem from '../NavItem/NavItem';

export default function Navigation() {
  const [navList, setNavList] = useState([]);

  useEffect(() => {
    axios
      .get('/navItems.json')
      .then((response) => {
        setNavList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching nav list:', error);
      });
  }, []);

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {navList.map((item, index) => (
          <NavItem icon={item.icon} label={item.label} key={index} />
        ))}
      </ul>
    </nav>
  );
}
