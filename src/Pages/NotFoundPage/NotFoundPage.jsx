import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
function NotFoundPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404 🎬</h1>
        <h2 className={styles.subtitle}>La pagina que buscas no existe</h2>
        <div>
          <h3>Pero puedes probar con estas: </h3>
          <Link to="/"> Volver a inicio 🏠 </Link>
          <Link to="/movies">Ver peliculas 🍿</Link>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
