import styles from './MainSection.module.css';

export default function MainSection({ children }) {
  return <main className={styles.main}>{children}</main>;
}
