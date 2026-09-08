import apiCLient from "../../config/axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/slices/authSlices";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import Wishlist from "../../components/Wishlist/Wishlist";

function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user)

    useEffect(()=>{
        if(!user) {
            navigate("/login")
        }
    }, [user, navigate])

    const handleLogout = async () => {
        try {
            await apiCLient.post("/logout");
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesion", error)
        }finally{
            dispatch(clearUser());
            navigate("login")
        }
  };

  if (!user) return null;
  

return (
    <main className={styles.container}>
    <div className={styles.card}>
        <div className={styles.avatar}>
        👤
        </div>
        <h1 className={styles.title}>Mi Perfil</h1>

        <div className={styles.infoGroup}>
        <label>Nombre de usuario</label>
        <p>{user.name}</p>
        </div>

        {user.email && (
        <div className={styles.infoGroup}>
            <label>Correo Electrónico</label>
            <p>{user.email}</p>
        </div>
        )}

        <div className={styles.actions}>
        <button onClick={handleLogout} className={styles.logoutBtn}>
            Cerrar Sesión
        </button>
        </div>
    </div>
    <section className={styles.wishlistSection}>
    <Wishlist />
    </section>
    </main>
);
}

export default ProfilePage;