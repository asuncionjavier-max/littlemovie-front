import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../store/slices/authSlices";
import apiCLient from "../../config/axios";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const cartItems = useSelector((state) => state.cart.items);


    const handleOut = async () =>{
        try {
            await apiCLient.post("/logout");
        } catch (error) {
            console.error("Error al cerrar sesion", error);
        } finally{
            dispatch(clearUser());   
            navigate("/login");
        }
    };
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
            <button onClick={handleOut} className={styles.logoutBtn}>
            Logout
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