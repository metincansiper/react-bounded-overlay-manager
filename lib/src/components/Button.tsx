import styles from './button.style.module.css';

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className={styles.button} {...props} />
}