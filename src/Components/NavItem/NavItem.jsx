import styles from './NavItem.module.css';
export default function NavItem({ icon, label, href = '#' }) {
  return (
    <li className={styles.navLi}>
      <img src={icon} alt={label} />
      <a className={styles.navLink} href={href}>
        {label}
      </a>
    </li>
  );
}
