import apiClient from "../../config/axios";
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/authSlices"; // Si quieres auto-loguear tras el registro
import styles from "./Register.module.css";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

    const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
    };

    try {
        const response = await apiClient.post("/register", payload);
        alert("usuario registrado con exito, por favor inicia sesion en login")


        if (response.data.user) {
        dispatch(setUser(response.data.user));
        navigate("/");
    } else {
        navigate("/login");
    }
    } catch (err) {
        const errorMessage =
        err.response?.data?.message || "Error al registrar la cuenta";
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
    };

return (
    <main className={styles.container}>
        <form className={styles.card} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Crear Cuenta</h2>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.inputGroup}>
        <label htmlFor="name">Nombre</label>
        <input
            ref={nameRef}
            type="text"
            id="name"
            placeholder="Tu nombre"
            required
        />
        </div>

        <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
            ref={emailRef}
            type="email"
            id="email"
            autoComplete="email"
            placeholder="ejemplo@correo.com"
            required
        />
        </div>

        <div className={styles.inputGroup}>
        <label htmlFor="password">Contraseña</label>
        <input
            ref={passwordRef}
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="••••••••"
            required
        />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
        </button>

        <p className={styles.loginRedirect}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
    </form>
    </main>
);
}

export default Register;