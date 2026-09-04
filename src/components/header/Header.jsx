import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Header() {
    const { user, logout } = useAuth();

return (
    <header className={styles.header}>
    <Link to="/" className={styles.logo}>
        Little <span>Movie</span>
    </Link>

    <nav className={styles.nav}>
        <Link to="/">Inicio</Link>
        <Link to="/movies">Películas</Link>
        <Link to="/about">Sobre nosotros</Link>
    </nav>

        <div className={styles.actions}>
        {user ? (
        <div className={styles.userControls}>
            <Link to="/cart" title="Carrito">
            🛒
            </Link>
            <Link to = "/profile">
            <span className={styles.userName}>👤 {user.name}</span>
            </Link>
            <button onClick={logout} className={styles.logoutBtn}>
            Salir
            </button>
        </div>
        ) : (
        <Link to="/login" className={styles.loginBtn}>
            Login
        </Link>
        )}
    </div>
    </header>
    );
}

export default Header;