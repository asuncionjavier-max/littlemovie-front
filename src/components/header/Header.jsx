import styles from "./Header.module.css";

function Header() {
return (
    <header className={styles.header}>
            <nav className={styles.nav}>
        <h1 className={styles.title}>
        Little <span>Movie</span>
        </h1>
        <ul className={styles.navList}>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#peliculas">Películas</a></li>
            <li><a href="#nosotros">Sobre nosotros</a></li>
            <li><a href="#login" className={styles.loginBtn}>Login</a></li>
        </ul>
    </nav>
    </header>
);
}

export default Header;