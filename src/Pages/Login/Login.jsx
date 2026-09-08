import apiCLient from "../../config/axios";
import { useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlices";
import styles from "./Login.module.css"

function Login () {

const dispatch = useDispatch()
const emailRef = useRef();
const PasswordRef = useRef();

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Extraemos los valores directamente de las referencias
    const payload = {
    email: emailRef.current.value,
    password: PasswordRef.current.value,
    };
try {
    
    const response = await apiCLient.post("/login", payload);
    const userData = response.data.user || response.data;
    dispatch(setUser(userData))
    
    console.log("> Inicio de sesion", response.data)
    navigate("/")

} catch (err) {
    const errorMessage = err.response?.data?.message || "Error al iniciar sesión";
    setError(errorMessage);
    } finally {
    setLoading(false);
}
}
    return(
    <main className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Iniciar Sesión</h2>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            autoComplete="current-email"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            ref={PasswordRef}
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
        <Link to ="/register" className={styles.register}> Registrate </Link>
      </form>
    </main>
)
}


export default Login